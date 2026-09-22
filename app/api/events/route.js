import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Event from "@/models/Event";
import { seedEvents } from "@/lib/events-data";

export async function GET() {
  try {
    await connectToDatabase();
    const events = await Event.find({}).sort({ date: 1 }).lean();
    if (events.length > 0) {
      return NextResponse.json({ source: "db", events });
    }
  } catch (err) {
    // fall through to seed data
  }
  return NextResponse.json({ source: "seed", events: seedEvents });
}
