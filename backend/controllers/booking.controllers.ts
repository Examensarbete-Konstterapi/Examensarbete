import { Request, Response } from "express";
import { BookingModel } from "../models/booking.model.ts";
import { SessionModel } from "../models/session.model.ts";
import { AuthRequest } from "../middlewares/auth.middleware.ts";
import mongoose from "mongoose";

export async function getAllBookings(req: Request, res: Response) {
  try {
    const bookings = await BookingModel.find()
      .populate({
        path: "sessionId",
        select: "date startTime maxParticipants courseId",
        populate: {
          path: "courseId",
          select: "title category price description",
        },
      })
      .populate("userId", "firstName lastName email");
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
}

export async function getBookingById(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (!id || Array.isArray(id) || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid bookingID" });
    }

    const booking = await BookingModel.findById(id)
      .populate("sessionId")
      .populate("userId", "firstName lastName email");

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch booking" });
  }
}

export async function getUserBookings(req: AuthRequest, res: Response) {
  try {
    const userId = req.user!.id;

    const bookings = await BookingModel.find({ userId }).populate({
      path: "sessionId",
      populate: {
        path: "courseId",
        select: "title",
      },
    });

    if (bookings.length === 0) {
      return res.status(404).json({
        error: "No bookings found for this user",
      });
    }

    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch user bookings" });
  }
}

export async function createBooking(req: AuthRequest, res: Response) {
  try {
    const { sessionId, message } = req.body;

    if (
      !sessionId ||
      Array.isArray(sessionId) ||
      !mongoose.Types.ObjectId.isValid(sessionId)
    ) {
      return res.status(400).json({ error: "Invalid SessionID" });
    }
    // Kolla att session finns
    const session = await SessionModel.findById(sessionId);
    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }
    // Kolla om användaren redan bokat
    const existingBooking = await BookingModel.findOne({
      sessionId,
      userId: req.user!.id,
    });
    if (existingBooking) {
      return res
        .status(400)
        .json({ error: "User have already booked this session" });
    }
    // Kolla antal bokningar på sessionen
    const bookingCount = await BookingModel.countDocuments({ sessionId });

    if (bookingCount >= session.maxParticipants) {
      return res.status(400).json({ error: "Session is fully booked" });
    }
    // Skapa bokning
    const booking = await BookingModel.create({
      sessionId,
      userId: req.user!.id,
      message,
    });

    const populatedBooking = await booking.populate([
      {
        path: "sessionId",
        populate: {
          path: "courseId",
          select: "title description category price",
        },
      },
      {
        path: "userId",
        select: "firstName lastName email",
      },
    ]);

    res.status(201).json(populatedBooking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create booking" });
  }
}

export async function deleteBooking(req: AuthRequest, res: Response) {
  try {
    const userId = req.user!.id;
    const { id } = req.params;

    if (!id || Array.isArray(id) || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid bookingID" });
    }

    const booking = await BookingModel.findById(id);

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    if (req.user!.role !== "admin" && booking.userId.toString() !== userId) {
      return res.status(403).json({ error: "Forbidden" });
    }

    await booking.deleteOne();

    res.json({
      message: "Booking deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete booking" });
  }
}
