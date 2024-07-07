import Booking from "./../models/Booking.js";

// create new booking
export const createBooking = async (req, res) => {
  const newBooking = new Booking({
    ...req.body,
    status: "pending", // Set default status to 'pending'
  });

  try {
    const savedBooking = await newBooking.save();
    res
      .status(200)
      .json({
        success: true,
        message: "Your tour is booked!",
        data: savedBooking,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
};

// get single booking
export const getBooking = async (req, res) => {
  const id = req.params.id;

  try {
    const book = await Booking.findById(id);
    res.status(200).json({ success: true, message: "Successful!", data: book });
  } catch (error) {
    res.status(404).json({ success: false, message: "Not Found!" });
  }
};

// get all bookings
export const getAllBooking = async (req, res) => {
  try {
    const books = await Booking.find();
    res
      .status(200)
      .json({ success: true, message: "Successful!", data: books });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
};

export const updateBookingStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    // console.log('Updated booking:', updatedBooking);
    res
      .status(200)
      .json({
        success: true,
        message: "Booking status updated!",
        data: updatedBooking,
      });
  } catch (error) {
    console.error("Error updating booking status:", error.message);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
};

// delete booking
export const deleteBooking = async (req, res) => {
  // console.log("deleted called");
  const { id } = req.params;

  try {
    await Booking.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Booking deleted!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
};
