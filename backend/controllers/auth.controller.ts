import { Request, Response } from "express";
import { UserModel } from "../models/user.model.ts";
import jwt from "jsonwebtoken";

//REGISTER USER
export async function registerUser(req: Request, res: Response) {
  try {
    const { first_name, last_name, email, password } = req.body;

    // 1. Enkel validering
    if (!first_name || !last_name || !email || !password) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    // 2. Kolla om user redan finns
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    // 3. Skapa user (password hashas automatiskt i schema)
    const newUser = new UserModel({
      first_name,
      last_name,
      email,
      password,
      // role sätts automatiskt till "user"
    });

    await newUser.save();

    // 4. Skapa token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    // 5. Response
    res.status(201).json({
      id: newUser._id,
      name: `${newUser.first_name} ${newUser.last_name}`,
      email: newUser.email,
      role: newUser.role,
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

//LOGIN
export async function loginUser(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      res.status(400).json({ error: "Email and password required" });
      return;
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      {
        id: user!._id.toString(),
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" },
    );

    res
      .status(200)
      .json({
        id: user._id,
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        role: user.role,
        token,
      });
  } catch (error) {
    res.status(500).json({ error: "Failed to login user" });
  }
}

//  const { email, password } = req.body;

//         const user = await UserModel.findOne({ email });
//         if(!user) return res.status(404).json({ error: "User not found" });

//         const isMatch = await user.comparePassword(password);
//         if(!isMatch) return res.status(400).json({ error: "Invalid credentials" });

//         const token = jwt.sign({
//                 id: user!._id.toString(),
//                 email: user.email,
//                 role: user.role },
//             JWT_SECRET,
//             { expiresIn: "1h"}
//         );

//         res.json({ token });
