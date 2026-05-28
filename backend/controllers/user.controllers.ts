import { Request, Response } from "express";
import { UserModel } from "../models/user.model.ts";
import { AuthRequest } from "../middlewares/auth.middleware.ts";
import mongoose from "mongoose";

export async function getUsers(req: AuthRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Not authorized" });
    }
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Admin only" });
    }

    const users = await UserModel.find().select("-password");

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
}

export async function getUserById(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params

    if(!id || Array.isArray(id) || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid UserID"})
    }
    if (req.user?.role !== "admin" && req.user?.id !== id) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const user = await UserModel.findById(id).select("-password");

    if(!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch(err) {
    res.status(500).json({ 
      error: "Failed to fetch user"
    });
  }
}

export async function updateUser (req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;
    const { first_name, last_name, email } = req.body;

    if(!id || Array.isArray(id) || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid UserID"})
    }
    if (!req.user) {
      return res.status(401).json({ error: "Not authorized" });
    }

    const requesterRole = req.user.role;
    const requesterId = req.user.id;

    if(requesterRole !== "admin" && requesterId.toString() !== id.toString()) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const updateData: any = {};

    if (first_name) updateData.first_name = first_name;
    if (last_name) updateData.last_name = last_name;
    if (email) updateData.email = email;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: "No fields to update" });
    }

    const user = await UserModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({
      error: "Failed to update user"
    });
  }
}

export async function deleteUser(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;

    if(!id || Array.isArray(id) || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid UserID"})
    }

    if (!req.user) {
      return res.status(401).json({ error: "Not authorized" });
    }

    const requesterRole = req.user.role;
    const requesterId = req.user.id;

    if(requesterRole !== "admin" && requesterId.toString() !== id.toString()) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const user = await UserModel.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(204).send();
  } catch (err) {
    res.status(500).json({
      error: "Failed to delete user"
    });
  }
}