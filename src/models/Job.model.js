import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    jobTitle: {
      type: String,
      required: true,
      trim: true,
    },
    source: {
      type: String,
      default: "Direct",
    },
    status: {
      type: String,
      enum: [
        "Applied",
        "HR Round",
        "Technical Round",
        "Managerial Round",
        "Offer",
        "Rejected",
        "On Hold",
      ],
      default: "Applied",
    },
    appliedDate: {
      type: Date,
      default: Date.now,
    },
    followUpDate: {
      type: Date,
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
