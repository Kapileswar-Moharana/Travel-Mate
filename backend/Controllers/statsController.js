import Tour from "../models/Tour.js";
import Booking from "../models/Booking.js";
import User from "../models/User.js";

// Get tour statistics
export const getTourStats = async (req, res) => {
  try {
    const tourCount = await Tour.countDocuments();
    res.status(200).json({ success: true, data: tourCount });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch tour stats" });
  }
};

// Get booking statistics
export const getBookingStats = async (req, res) => {
  const currentMonth = new Date().getMonth();
  try {
    const bookings = await Booking.find();
    const monthlyBookings = bookings.filter(
      (booking) => new Date(booking.createdAt).getMonth() === currentMonth
    ).length;
    res.status(200).json({ success: true, data: monthlyBookings });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch booking stats",
      error: error.message,
    });
  }
};

// Get revenue statistics
export const getRevenueStats = async (req, res) => {
  const currentMonth = new Date().getMonth();
  try {
    const bookings = await Booking.find({});
    const monthlyRevenue = bookings
      .filter(
        (booking) => new Date(booking.createdAt).getMonth() === currentMonth
      )
      .reduce((total, booking) => total + booking.price, 0);
    res.status(200).json({ success: true, data: monthlyRevenue });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch revenue stats" });
  }
};

// Get user statistics
export const getUserStats = async (req, res) => {
  const currentMonth = new Date().getMonth();
  try {
    const userCount = await User.countDocuments();
    const users = await User.find({});
    const monthlyNewUsers = users.filter(
      (user) => new Date(user.createdAt).getMonth() === currentMonth
    ).length;
    res
      .status(200)
      .json({ success: true, data: { userCount, monthlyNewUsers } });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch user stats" });
  }
};
