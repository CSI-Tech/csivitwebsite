import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Team from "@/models/Team";

// GET /api/admin/teams?eventSlug=xxx
// Returns all registered teams, newest first.
export async function GET(req) {
  const url = new URL(req.url);
  const eventSlug = url.searchParams.get("eventSlug");

  try {
    await connectToDatabase();
    const query = eventSlug ? { eventSlug } : {};
    const teams = await Team.find(query).sort({ createdAt: -1 }).lean();
    return NextResponse.json({
      teams: teams.map((t) => ({ ...t, _id: String(t._id) }))
    });
  } catch (err) {
    console.error("[admin teams] failed:", err?.message);
    return NextResponse.json(
      { error: "Database unavailable. Could not load teams." },
      { status: 503 }
    );
  }
}
