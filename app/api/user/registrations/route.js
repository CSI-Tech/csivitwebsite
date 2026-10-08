import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import Registration from "@/models/Registration";
import Event from "@/models/Event";
import { seedEvents, findSeedEvent } from "@/lib/events-data";

export async function GET(req) {
  const session = await getServerSession(authOptions);
  const url = new URL(req.url);
  const email = url.searchParams.get("email") || session?.user?.email;

  if (!email) {
    return NextResponse.json({ registrations: [] });
  }

  try {
    await connectToDatabase();
    const regs = await Registration.find({ email: email.toLowerCase().trim() })
      .sort({ createdAt: -1 })
      .lean();

    const results = await Promise.all(
      regs.map(async (r) => {
        let ev = await Event.findOne({ slug: r.eventSlug }).lean();
        if (!ev) ev = findSeedEvent(r.eventSlug);
        return {
          ...r,
          _id: String(r._id),
          event: ev || {
            title: r.eventTitle || r.eventSlug,
            slug: r.eventSlug,
            venue: "VIT Mumbai",
            date: "2026-10-13",
            time: "16:00 IST",
            category: "Programme"
          }
        };
      })
    );

    return NextResponse.json({ registrations: results });
  } catch (err) {
    // If DB is offline, return empty or mock
    return NextResponse.json({ registrations: [] });
  }
}
