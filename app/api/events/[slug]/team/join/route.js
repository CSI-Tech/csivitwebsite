import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Team from "@/models/Team";

// POST /api/events/[slug]/team/join
// body: { teamCode, name, email, phone }
export async function POST(req, { params }) {
  let body = {};
  try { body = await req.json(); } catch {}
  const { teamCode, name, email, phone = "" } = body;

  const code = (teamCode || "").toUpperCase().trim();
  if (!code) return NextResponse.json({ error: "Team code is required." }, { status: 400 });
  if (!name?.trim()) return NextResponse.json({ error: "Your name is required." }, { status: 400 });
  if (!email?.trim()) return NextResponse.json({ error: "Email is required." }, { status: 400 });

  try {
    await connectToDatabase();

    const team = await Team.findOne({ teamCode: code, eventSlug: params.slug });
    if (!team) {
      return NextResponse.json({ error: "Team code not found for this event." }, { status: 404 });
    }
    if (team.locked) {
      return NextResponse.json({ error: "Team is locked." }, { status: 409 });
    }
    if (team.members.length >= team.maxSize) {
      return NextResponse.json({ error: "Team is already full." }, { status: 409 });
    }

    const lowerEmail = email.toLowerCase().trim();
    if (team.members.some((m) => m.email === lowerEmail)) {
      return NextResponse.json({ ok: true, alreadyJoined: true, team });
    }

    // Check this email isn't on another team for the same event
    const otherTeam = await Team.findOne({
      eventSlug: params.slug,
      "members.email": lowerEmail,
      teamCode: { $ne: code }
    }).lean();
    if (otherTeam) {
      return NextResponse.json(
        { error: "You're already in a different team for this event.", teamCode: otherTeam.teamCode },
        { status: 409 }
      );
    }

    team.members.push({
      name: name.trim(),
      email: lowerEmail,
      phone: phone.trim(),
      isLeader: false
    });

    // If we've hit max size, auto-lock the team
    if (team.members.length >= team.maxSize) team.locked = true;

    await team.save();

    return NextResponse.json({ ok: true, team });
  } catch (err) {
    console.error("[team join] failed:", err?.message);
    return NextResponse.json(
      { error: "Database unavailable. Could not join team. Please try again." },
      { status: 503 }
    );
  }
}
