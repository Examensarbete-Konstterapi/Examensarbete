import { Request, Response } from "express";
import { CourseModel } from "../models/course.model.ts";
import { SessionModel } from "../models/session.model.ts";
import mongoose from "mongoose";

export async function getSessions(req: Request, res: Response) {
  try {
    const sessions = await SessionModel.find().populate("courseId", "title");

    res.json(sessions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch sessions" });
  }
}

export async function getSessionById(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (!id || Array.isArray(id) || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid SessionID" });
    }

    const session = await SessionModel.findById(id).populate(
      "courseId",
      "title",
    );

    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    res.json(session);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch session" });
  }
}

export async function updateSession(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { date, maxParticipants } = req.body;

    if (!id || Array.isArray(id) || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid SessionID" });
    }

    const updatedSession = await SessionModel.findByIdAndUpdate(
      id,
      { date, maxParticipants },
      { new: true },
    );
    if (!updatedSession) {
      return res.status(404).json({ error: "Session not found" });
    }

    res.json(updatedSession);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update session" });
  }
}

export async function deleteSession(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (!id || Array.isArray(id) || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid SessionID" });
    }

    const deletedSession = await SessionModel.findByIdAndDelete(id);
    if (!deletedSession) {
      return res.status(404).json({ error: "Session not found" });
    }

    res.json({
      message: "Session deleted successfully",
      session: deletedSession,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete session" });
  }
}
