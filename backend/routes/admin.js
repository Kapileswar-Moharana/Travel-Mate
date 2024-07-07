import express from "express";
import {
  createTour,
  deleteTour,
  AdmingetAllTour,
  updateTour,
} from "../Controllers/tourControllers.js";
import { createUser } from "../Controllers/userController.js";

import { verifyAdmin } from "../utils/verifyToken.js";

import {
  getTourStats,
  getBookingStats,
  getRevenueStats,
  getUserStats,
} from "../Controllers/statsController.js";

const router = express.Router();

router.post("/createuser", verifyAdmin, createUser);

//Create new tour
router.post("/createtour", verifyAdmin, createTour);

//Update tour
router.put("/:id", verifyAdmin, updateTour);

//Delete tour
router.delete("/:id", verifyAdmin, deleteTour);

//Get all tour

router.get("/tourlist", verifyAdmin, AdmingetAllTour);

// Dashboard statistics
router.get("/tourstats", verifyAdmin, getTourStats);
router.get("/userstats", verifyAdmin, getUserStats);
router.get("/bookingstats", verifyAdmin, getBookingStats);
router.get("/revenuestats", verifyAdmin, getRevenueStats);

export default router;
