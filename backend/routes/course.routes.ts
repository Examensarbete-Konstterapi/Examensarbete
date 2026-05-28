import { Router } from "express";
import { adminOnly, auth } from "../middlewares/auth.middleware.ts";

const router = Router();

// Course
// router.get("/courses", getCourses);
// router.get("/courses/:id", getCourseById);
// router.get("/courses/:id/participants", getCourseParticipantsCount);

// //Admin only
// router.post("/courses", auth, adminOnly, createCourse);
// router.delete("/courses/:id", auth, adminOnly, deleteCourse);
// router.put("/courses/:id", auth, adminOnly, updateCourse);
