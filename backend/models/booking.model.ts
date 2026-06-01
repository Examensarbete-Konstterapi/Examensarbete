import mongoose, { Schema } from "mongoose";

const BookingSchema = new Schema(
  {
    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
  },
},
  { timestamps: true },
);


export const BookingModel = mongoose.model("Booking", BookingSchema);
