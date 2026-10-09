import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import Registration from "@/models/Registration";
import Team from "@/models/Team";
import Event from "@/models/Event";
import { findSeedEvent } from "@/lib/events-data";

export async function GET(req) {
  const session = await getServerSession(authOptions);
  const url = new URL(req.url);
  const email = (url.searchParams.get("email") || session?.user?.email || "")
    .toLowerCase()
    .trim();

  if (!email) {
    return NextResponse.json({ registrations: [] });
  }

  try {
    await connectToDatabase();

    // Teams this user belongs to (as leader or member).
    const teams = await Team.find({ "members.email": email })
      .sort({ createdAt: -1 })
      .lean();

    // Legacy individual registrations.
    const regs = await Registration.find({ email })
      .sort({ createdAt: -1 })
      .lean();

    // Resolve event metadata for both sources.
    async function withEvent(slug) {
      let ev = await Event.findOne({ slug }).lean();
      if (!ev) ev = findSeedEvent(slug);
      return ev || {
        title: slug,
        slug,
        venue: "VIT Mumbai",
        date: "",
        time: "",
        category: "Programme"
      };
    }

    const teamItems = await Promise.all(
      teams.map(async (t) => ({
        _id: String(t._id),
        source: "team",
        eventSlug: t.eventSlug,
        eventTitle: t.eventTitle,
        teamCode: t.teamCode,
        teamName: t.teamName,
        leaderEmail: t.leaderEmail,
        isLeader: t.members.some((m) => m.email === email && m.isLeader),
        memberCount: t.members.length,
        maxSize: t.maxSize,
        createdAt: t.createdAt,
        event: await withEvent(t.eventSlug)
      }))
    );

    const regItems = await Promise.all(
      regs.map(async (r) => ({
        ...r,
        _id: String(r._id),
        source: "individual",
        event: await withEvent(r.eventSlug)
      }))
    );

    // Deduplicate by eventSlug — teams win over legacy individual rows for
    // the same event, since the team roster is the source of truth now.
    const taken = new Set(teamItems.map((t) => t.eventSlug));
    const filteredRegs = regItems.filter((r) => !taken.has(r.eventSlug));

    return NextResponse.json({
      registrations: [...teamItems, ...filteredRegs]
    });
  } catch (err) {
    console.error("[user registrations] failed:", err?.message);
    return NextResponse.json(
      { error: "Database unavailable.", registrations: [] },
      { status: 503 }
    );
  }
}
