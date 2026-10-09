import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Team from "@/models/Team";
import Event from "@/models/Event";
import { findSeedEvent } from "@/lib/events-data";
import { generateUniqueTeamCode } from "@/lib/team-code";

// GET /api/events/[slug]/team?code=XXXXXX  → preview team (used before joining)
export async function GET(req, { params }) {
  const url = new URL(req.url);
  const code = (url.searchParams.get("code") || "").toUpperCase().trim();
  if (!code) return NextResponse.json({ error: "Code required" }, { status: 400 });

  try {
    await connectToDatabase();
    const team = await Team.findOne({ teamCode: code, eventSlug: params.slug }).lean();
    if (!team) return NextResponse.json({ found: false });
    return NextResponse.json({
      found: true,
      team: {
        teamCode: team.teamCode,
        teamName: team.teamName,
        memberCount: team.members.length,
        maxSize: team.maxSize,
        minSize: team.minSize,
        locked: team.locked,
        members: team.members.map((m) => ({ name: m.name, isLeader: m.isLeader }))
      }
    });
  } catch (err) {
    console.error("[team preview] failed:", err?.message);
    return NextResponse.json({ error: "Database unavailable." }, { status: 503 });
  }
}

// POST /api/events/[slug]/team  → create a new team, returns code
export async function POST(req, { params }) {
  let body = {};
  try { body = await req.json(); } catch {}
  const { teamName, name, email, phone = "" } = body;

  if (!teamName?.trim()) return NextResponse.json({ error: "Team name is required." }, { status: 400 });
  if (!name?.trim()) return NextResponse.json({ error: "Your name is required." }, { status: 400 });
  if (!email?.trim()) return NextResponse.json({ error: "Email is required." }, { status: 400 });

  const seed = findSeedEvent(params.slug);

  try {
    await connectToDatabase();

    // ensure event doc exists so we can snapshot its sizes
    let event = await Event.findOne({ slug: params.slug });
    if (!event) {
      if (!seed) return NextResponse.json({ error: "Event not found" }, { status: 404 });
      event = await Event.create(seed);
    }

    const maxSize = event.maxTeamSize || seed?.maxTeamSize || 4;
    const minSize = event.minTeamSize || seed?.minTeamSize || 2;

    // Check this email isn't already on a team for this event
    const existing = await Team.findOne({
      eventSlug: params.slug,
      "members.email": email.toLowerCase().trim()
    }).lean();
    if (existing) {
      return NextResponse.json(
        { error: "You're already in a team for this event.", teamCode: existing.teamCode },
        { status: 409 }
      );
    }

    const teamCode = await generateUniqueTeamCode(Team);
    const team = await Team.create({
      eventSlug: params.slug,
      eventTitle: event.title || seed?.title || "",
      teamCode,
      teamName: teamName.trim(),
      leaderEmail: email.toLowerCase().trim(),
      members: [
        {
          name: name.trim(),
          email: email.toLowerCase().trim(),
          phone: phone.trim(),
          isLeader: true
        }
      ],
      maxSize,
      minSize
    });

    return NextResponse.json({ ok: true, teamCode: team.teamCode, team });
  } catch (err) {
    console.error("[team create] failed:", err?.message);
    return NextResponse.json(
      { error: "Database unavailable. Could not create team. Please try again." },
      { status: 503 }
    );
  }
}
