import { Router } from "express";

import { auth, adminOnly } from "../middlewares/auth.middleware.ts";
import {
  getSessions,
  getSessionById,
  updateSession,
  deleteSession,
  createSession,
} from "../controllers/session.controllers.ts";

const router = Router();

router.get("/sessions", getSessions);
router.get("/sessions/:id", getSessionById);

router.post("/sessions", auth, adminOnly, createSession);
router.put("/sessions/:id", auth, adminOnly, updateSession);
router.delete("/sessions/:id", auth, adminOnly, deleteSession);

export default router;
