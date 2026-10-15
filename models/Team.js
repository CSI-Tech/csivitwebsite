import mongoose from "mongoose";

const MemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, default: "", trim: true },
    isLeader: { type: Boolean, default: false },
    joinedAt: { type: Date, default: Date.now }
  },
  { _id: false }
);

const TeamSchema = new mongoose.Schema(
  {
    eventSlug: { type: String, required: true, index: true },
    eventTitle: { type: String, default: "" },
    teamCode: {
      type: String,
      required: true,
      unique: true,
      index: true,
      uppercase: true,
      trim: true
    },
    teamName: { type: String, required: true, trim: true },
    leaderEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true
    },
    members: { type: [MemberSchema], default: [] },
    maxSize: { type: Number, default: 4 },
    minSize: { type: Number, default: 2 },
    locked: { type: Boolean, default: false }
  },
  { timestamps: true }
);

// A given email can only belong to one team per event.
TeamSchema.index(
  { eventSlug: 1, "members.email": 1 },
  { unique: false }
);

export default mongoose.models.Team || mongoose.model("Team", TeamSchema);
