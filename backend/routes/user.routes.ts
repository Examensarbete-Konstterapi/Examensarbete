import { Router } from "express";
import { registerUser } from "../controllers/auth.controller.ts";
import { loginUser } from "../controllers/auth.controller.ts";

const router = Router();

router.post("/auth/login", loginUser);
router.post("/auth/register", registerUser);

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
