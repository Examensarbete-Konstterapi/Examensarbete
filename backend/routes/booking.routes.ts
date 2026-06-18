import { Router } from "express";
import { auth, adminOnly } from "../middlewares/auth.middleware.ts";
import {
    getAllBookings,
    getUserBookings,
    createBooking,
    deleteBooking,
    getBookingById
} from "../controllers/booking.controllers.ts";

const router = Router();

router.post("/bookings", auth, createBooking);
router.get("/bookings/my-bookings", auth, getUserBookings);
//Update kanske läggass till senare
// router.put("/bookings/:id", auth, updateBooking);
router.delete("/bookings/:id", auth, deleteBooking);

//Admin
router.get("/bookings", auth, adminOnly, getAllBookings);
router.get("/bookings/:id", auth, adminOnly, getBookingById);



export default router;
