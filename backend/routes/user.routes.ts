import { Router } from "express";
import { registerUser } from "../controllers/auth.controllers.ts";
import { loginUser } from "../controllers/auth.controllers.ts";
import { auth, adminOnly } from "../middlewares/auth.middleware.ts";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controllers.ts";

const router = Router();

// Auth
router.post("/auth/login", loginUser);
router.post("/auth/register", registerUser);

// User
router.get("/users", adminOnly, getUsers);
router.get("/users/:id", auth, getUserById);
router.put("/users/:id", auth, updateUser);
router.delete("/users/:id", auth, deleteUser);
// //Auth
// router.post("/auth/register", registerUser);
// router.post("/auth/register-admin", registerAdmin);
// router.post("/auth/login", loginUser);
// router.get("/me", auth, getMe);

// //Current user
// router.put("/me", auth, updateMe);
// router.delete("/me", auth, deleteMe);
// router.put("/me/password", auth, updatePassword);

// //Admin user
// // router.get("/", auth, requireAdmin, getUsers);
// router.get("/", getUsers);
// router.get("/:id", auth, requireAdmin, getUserById);
// router.put("/:id", auth, requireAdmin, updateUser);
// router.delete("/:id", auth, requireAdmin, deleteUser);

export default router;
