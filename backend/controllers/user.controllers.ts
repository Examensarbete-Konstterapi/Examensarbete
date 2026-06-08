import { Request, Response } from "express";
import { UserModel } from "../models/user.model.ts";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

export async function getUsers(req: Request, res: Response) {
  try {
    const users = await UserModel.find().select("-password");

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
}

export async function getUserById(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (!id || Array.isArray(id) || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid UserID" });
    }

    const user = await UserModel.findById(id).select("-password");

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({
      error: "Failed to fetch user",
    });
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { firstName, lastName, email } = req.body;

    if (!id || Array.isArray(id) || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid UserID" });
    }

    const updateData: any = {};

    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (email) updateData.email = email;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: "No fields to update" });
    }

    const user = await UserModel.findByIdAndUpdate(id, updateData, {
      new: true,
    }).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({
      error: "Failed to update user",
    });
  }
}

export async function updatePassword(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { currentPassword, newPassword } = req.body;

    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    const passwordMatch = await bcrypt.compare(currentPassword, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        error: "Current password is incorrect",
      });
    }

    user.password = newPassword;

    await user.save();

    res.json({
      message: "Password updated",
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to update password",
    });
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (!id || Array.isArray(id) || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid UserID" });
    }

    const user = await UserModel.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(204).send();
  } catch (err) {
    res.status(500).json({
      error: "Failed to delete user",
    });
  }
}
