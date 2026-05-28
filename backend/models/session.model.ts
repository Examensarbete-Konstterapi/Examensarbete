import mongoose, { Schema } from "mongoose";

const SessionSchema = new Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    maxParticipants: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

SessionSchema.index({ courseId: 1, date: 1 }, { unique: true });

export const SessionModel = mongoose.model("Session", SessionSchema);
