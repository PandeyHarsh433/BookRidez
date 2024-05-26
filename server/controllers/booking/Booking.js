const Booking = require("@models/Booking");
const User = require("@models/User");
const mongoose = require("mongoose");
const Customer = require("@models/Customer");
const MarketPlace = require("@models/MarketPlace");

const bookARide = async (req, res) => {
  try {
    const userId = req.user._id;
    const {
      vehicleId,
      pickUpPoint,
      pickUpTime,
      dropTime,
      dropDate,
      pickUpDate,
      totalHour,
      price,
      helmet,
    } = req.body;

    const customers = await Customer.aggregate([
      {
        $match: {
          marketPlace: {
            $elemMatch: {
              $eq: new mongoose.Types.ObjectId(vehicleId),
            },
          },
        },
      },
      {
        $project: {
          _id: "$_id",
          marketPlaceIds: 1,
        },
      },
    ]);

    const customerData = [];
    for (let i = 0; i < customers.length; i++) {
      customerData[i] = {
        customerId: customers[i]._id,
      };
    }

    const booking = await Booking.create({
      user: userId,
      customers: customerData,
      vehicle: vehicleId,
      pickUpPoint,
      dropDate,
      pickUpDate,
      pickUpTime,
      dropTime,
      totalHour,
      price,
      helmet,
    });

    res.status(201).json({
      success: true,
      message: "Booking started successfully",
      booking,
    });
  } catch (error) {
    console.error("Error starting booking:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to start booking" });
  }
};

const getUserBookings = async (req, res) => {
  try {
    const userId = req.user._id;
    const { status, page = 1, limit = 10 } = req.query;

    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    };

    const query = { user: userId };
    if (status) query["customers.status"] = status;

    const userBookings = await Booking.find(query)
      .sort({ createdAt: -1 })
      .skip((options.page - 1) * options.limit)
      .limit(options.limit);

    const total = await Booking.countDocuments(query);

    res.json({
      success: true,
      total,
      totalPages: Math.ceil(total / options.limit),
      currentPage: options.page,
      bookings: userBookings,
    });
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user bookings",
    });
  }
};

const getCustomerBookings = async (req, res) => {
  try {
    const customerId = req.user._id;
    const { status, page = 1, limit = 10 } = req.query;

    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    };

    const query = { "customers.customerId": customerId };
    if (status) query["customers.status"] = status.toUpperCase();

    const customerBookings = await Booking.find(query)
      .sort({ createdAt: -1 })
      .skip((options.page - 1) * options.limit)
      .limit(options.limit);

    const total = await Booking.countDocuments(query);

    res.json({
      success: true,
      total,
      totalPages: Math.ceil(total / options.limit),
      currentPage: options.page,
      bookings: customerBookings,
    });
  } catch (error) {
    console.error("Error fetching customer bookings:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch customer bookings",
    });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const bookingId = req.params.bookingId;
    const userId = req.user._id;
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    if (booking.user.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to cancel this booking",
      });
    }

    if (booking.status === "Canceled") {
      return res
        .status(400)
        .json({ success: false, message: "Booking is already canceled" });
    }

    booking.status = "Canceled";
    booking.customers.forEach((customer) => {
      customer.status = "Canceled";
    });

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Booking canceled successfully",
      booking,
    });
  } catch (error) {
    console.error("Error canceling booking:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to cancel booking" });
  }
};

const acceptBooking = async (req, res) => {
  try {
    const bookingId = req.query.bookingId;
    const customerId = req.user?._id;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    if (booking.status === "Canceled") {
      return res
        .status(400)
        .json({ success: false, message: "Booking is canceled" });
    }

    const vehicle = await MarketPlace.findById(booking?.vehicle);
    if (!vehicle) {
      return res.status(403).json({
        success: false,
        message: "You don't have permission to accept this booking",
      });
    }

    let customerFound = false;
    for (let customerBooking of booking.customers) {
      if (customerBooking.customerId.toString() === customerId) {
        customerBooking.status = "Booked";
        customerFound = true;
      }
    }

    if (!customerFound) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found in booking" });
    }

    booking.customers = booking.customers.filter((customerBooking) => {
      return (
        customerBooking.customerId.toString() === customerId ||
        customerBooking.status !== "Pending"
      );
    });
    console.log(booking?.customers);

    booking.status = "Booked";
    await booking.save();

    const user = await User.findById(booking.user);
    user.bookings.push(booking._id);
    await user.save();

    const customer = await Customer.findOne({ customerId: booking.customer });
    console.log(customer);
    customer.marketPlace.push(booking._id);
    await customer.save();

    res
      .status(200)
      .json({ success: true, message: "Booking accepted", booking });
  } catch (error) {
    console.error("Error accepting booking:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to accept booking" });
  }
};

const rejectBooking = async (req, res) => {
  try {
    const bookingId = req.query.bookingId;
    const customerId = req.user?._id;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    if (booking.status === "Canceled") {
      return res
        .status(400)
        .json({ success: false, message: "Booking is already canceled" });
    }

    const vehicle = await MarketPlace.findById(booking?.vehicle);
    if (!vehicle) {
      return res.status(403).json({
        success: false,
        message: "You don't have permission to reject this booking",
      });
    }

    let customerFound = false;
    for (let customerBooking of booking.customers) {
      if (customerBooking.customerId.toString() === customerId) {
        customerBooking.status = "Rejected";
        customerFound = true;
      }
    }

    if (!customerFound) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found in booking" });
    }

    booking.customers = booking.customers.filter((customerBooking) => {
      return (
        customerBooking.customerId.toString() === customerId ||
        customerBooking.status !== "Pending"
      );
    });

    await booking.save();

    const user = await User.findById(booking.user);
    user.bookings = user.bookings.filter(
      (id) => id.toString() !== booking._id.toString()
    );
    await user.save();

    const customer = await Customer.findOne({ customerId: booking.customer });
    customer.marketPlace = customer.marketPlace.filter(
      (id) => id.toString() !== booking._id.toString()
    );
    await customer.save();

    res
      .status(200)
      .json({ success: true, message: "Booking rejected", booking });
  } catch (error) {
    console.error("Error rejecting booking:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to reject booking" });
  }
};

const getBookingDetails = async (req, res) => {
  try {
    const booking = await Booking.findById(req.query.bookingId)
      .populate("user", "name mobile email")
      .populate({
        path: "customers.customerId",
        select: "name mobile email location",
      })
      .populate("vehicle", "name price image model speedLimit category cc");

    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    res.status(200).json({
      success: true,
      bookingData: {
        customer: booking?.customers[0]?.customerId,
        user: booking?.user,
        vehicle: booking?.vehicle,
        booking: {
          _id: booking?._id,
          dropDate: booking?.dropDate,
          dropTime: booking?.dropTime,
          pickUpDate: booking?.pickUpDate,
          pickUpPoint: booking?.pickUpPoint,
          pickUpTime: booking?.pickUpTime,
          status: booking?.customers[0]?.status,
          price: booking?.price,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching booking details:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch booking details" });
  }
};

module.exports = {
  bookARide,
  cancelBooking,
  getCustomerBookings,
  getUserBookings,
  acceptBooking,
  rejectBooking,
  getBookingDetails,
};
