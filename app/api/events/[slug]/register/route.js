import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import Event from "@/models/Event";
import Registration from "@/models/Registration";
import User from "@/models/User";
import { findSeedEvent } from "@/lib/events-data";

export async function POST(_req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { slug } = params;

  try {
    await connectToDatabase();
  } catch (err) {
    return NextResponse.json(
      { error: "Database unavailable. Registration is disabled without MongoDB." },
      { status: 503 }
    );
  }

  const user = await User.findOne({ email: session.user.email });
  if (!user) {
    return NextResponse.json({ error: "User record missing" }, { status: 404 });
  }

  let event = await Event.findOne({ slug });
  if (!event) {
    const seed = findSeedEvent(slug);
    if (!seed) return NextResponse.json({ error: "Event not found" }, { status: 404 });
    event = await Event.create(seed);
  }

  try {
    const reg = await Registration.create({
      userId: user._id,
      eventId: event._id,
      eventSlug: event.slug,
      email: user.email
    });
    return NextResponse.json({ ok: true, registration: reg });
  } catch (err) {
    if (err?.code === 11000) {
      return NextResponse.json(
        { ok: true, alreadyRegistered: true },
        { status: 200 }
      );
    }
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET(_req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ registered: false });

  try {
    await connectToDatabase();
    const user = await User.findOne({ email: session.user.email });
    if (!user) return NextResponse.json({ registered: false });
    const found = await Registration.findOne({
      userId: user._id,
      eventSlug: params.slug
    });
    return NextResponse.json({ registered: !!found });
  } catch {
    return NextResponse.json({ registered: false });
  }
}
