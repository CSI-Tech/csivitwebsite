import mongoose from "mongoose";

const RegistrationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    eventSlug: { type: String, required: true, index: true },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
    email: { type: String, required: true }
  },
  { timestamps: true }
);

RegistrationSchema.index({ userId: 1, eventSlug: 1 }, { unique: true });

export default mongoose.models.Registration ||
  mongoose.model("Registration", RegistrationSchema);
