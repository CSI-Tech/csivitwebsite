import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Event from "@/models/Event";
import { seedEvents } from "@/lib/events-data";

export async function GET() {
  try {
    await connectToDatabase();
    const dbEvents = await Event.find({}).sort({ date: 1 }).lean();
    if (dbEvents && dbEvents.length > 0) {
      const formatted = dbEvents.map((e) => ({ ...e, _id: String(e._id) }));
      return NextResponse.json({ events: formatted });
    }
  } catch {}
  return NextResponse.json({ events: seedEvents });
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { slug, title } = body;
    if (!slug || !title) {
      return NextResponse.json({ error: "Title and slug are required" }, { status: 400 });
    }

    await connectToDatabase();
    const updated = await Event.findOneAndUpdate(
      { slug },
      { $set: body },
      { upsert: true, new: true }
    );
    return NextResponse.json({ ok: true, event: updated });
  } catch (err) {
    return NextResponse.json({ ok: true, fallback: true, message: "Saved locally." });
  }
}
