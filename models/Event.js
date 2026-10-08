import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    category: { type: String, default: "General" },
    tagline: { type: String, default: "" },
    shortDescription: { type: String, default: "" },
    description: { type: String, default: "" },
    date: { type: String, default: "" },
    time: { type: String, default: "" },
    venue: { type: String, default: "VIT Mumbai" },
    teamSize: { type: String, default: "Individual" },
    image: { type: String, default: "" },
    poster: { type: String, default: "" },
    features: { type: [String], default: [] },
    rules: { type: [String], default: [] },
    registrationOpen: { type: Boolean, default: true },
    registrationUrl: { type: String, default: "" }
  },
  { timestamps: true }
);

export default mongoose.models.Event || mongoose.model("Event", EventSchema);
