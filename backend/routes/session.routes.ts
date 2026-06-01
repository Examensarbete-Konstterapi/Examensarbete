import { Router } from "express";

import { auth, adminOnly } from "../middlewares/auth.middleware.ts";
import {
  getSessions,
  getSessionById,
  updateSession,
  deleteSession,
} from "../controllers/session.controllers.ts";

const router = Router();

router.get("/sessions", getSessions);
router.get("/sessions/:id", getSessionById);

router.put("/sessions/:id", auth, adminOnly, updateSession);
router.delete("/sessions/:id", auth, adminOnly, deleteSession);

export default router;
