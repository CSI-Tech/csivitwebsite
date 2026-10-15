import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Registration from "@/models/Registration";

export async function GET(req) {
  const url = new URL(req.url);
  const eventSlug = url.searchParams.get("eventSlug");

  try {
    await connectToDatabase();
    const query = eventSlug ? { eventSlug } : {};
    const regs = await Registration.find(query).sort({ createdAt: -1 }).lean();
    return NextResponse.json({
      registrations: regs.map((r) => ({ ...r, _id: String(r._id) }))
    });
  } catch (err) {
    return NextResponse.json({ registrations: [] });
  }
}
