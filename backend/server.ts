import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.ts";
import userRoutes from "./routes/user.routes.ts";
import courseRoutes from "./routes/course.routes.ts";
import sessionRoutes from "./routes/session.routes.ts";
import bookingRoutes from "./routes/booking.routes.ts";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", courseRoutes);
app.use("/api", sessionRoutes);
app.use("/api", bookingRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
