import { Request, Response } from "express";
import { CourseModel } from "../models/course.model.ts";
import { SessionModel } from "../models/session.model.ts";
import mongoose from "mongoose";

export async function getCourses(req: Request, res: Response) {
  try {
    const courses = await CourseModel.find();

    const coursesWithSessions = await Promise.all(
      courses.map(async (course) => {
        const sessions = await SessionModel.find({ courseId: course._id });
        return {
          ...course.toObject(),
          sessions,
        };
      }),
    );
    res.json(coursesWithSessions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch courses" });
  }
}

export async function getCourseById(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (!id || Array.isArray(id) || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid CourseID" });
    }

    const course = await CourseModel.findById(id);
    if (!course) return res.status(404).json({ error: "Course not found" });

    const sessions = await SessionModel.find({ courseId: course._id });

    res.json({
      ...course.toObject(),
      sessions,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch course" });
  }
}

export async function createCourse(req: Request, res: Response) {
  try {
    const { title, description, category, date, price, maxParticipants } =
      req.body;

    if (
      !title ||
      !description ||
      !category ||
      !date ||
      !price ||
      !maxParticipants
    ) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const newCourse = await CourseModel.create({
      title,
      description,
      category,
      price,
    });

    const sessions = date.map((date: string) => ({
      courseId: newCourse._id,
      date,
      maxParticipants,
    }));

    await SessionModel.insertMany(sessions);

    res.json({
      course: newCourse,
      sessions,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create course" });
  }
}
