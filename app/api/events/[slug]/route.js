import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Event from "@/models/Event";
import { findSeedEvent } from "@/lib/events-data";

export async function GET(_req, { params }) {
  const { slug } = params;
  try {
    await connectToDatabase();
    const event = await Event.findOne({ slug }).lean();
    if (event) return NextResponse.json({ source: "db", event });
  } catch {
    /* fall through */
  }
  const seed = findSeedEvent(slug);
  if (!seed) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ source: "seed", event: seed });
}
