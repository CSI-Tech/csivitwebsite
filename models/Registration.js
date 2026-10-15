import mongoose from "mongoose";

const RegistrationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
    eventSlug: { type: String, required: true, index: true },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
    eventTitle: { type: String, default: "" },
    name: { type: String, default: "" },
    email: { type: String, required: true, index: true },
    phone: { type: String, default: "" },
    type: { type: String, enum: ["individual", "team"], default: "individual" },
    teamName: { type: String, default: "" },
    teamMembers: { type: [String], default: [] },
    notes: { type: String, default: "" }
  },
  { timestamps: true }
);

RegistrationSchema.index({ email: 1, eventSlug: 1 }, { unique: true });

export default mongoose.models.Registration ||
  mongoose.model("Registration", RegistrationSchema);
