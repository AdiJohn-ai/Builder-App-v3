import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 160 },
    type: {
      type: String,
      enum: ["residential", "commercial", "renovation"],
      required: true,
    },
    location: { type: String, required: true, trim: true, maxlength: 120 },
    budget: { type: Number, required: true, min: 0 },
    description: { type: String, required: true, trim: true, maxlength: 5000 },
    startDate: { type: Date, required: true },
    endDate: { type: Date, default: null },
    status: {
      type: String,
      enum: ["Pending", "Planned", "In-Progress", "Completed", "Cancelled"],
      default: "Pending",
    },
    preferredTechnicians: { type: [String], default: [] },
    requesterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Requester",
      required: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Freelancer",
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Project", ProjectSchema);
