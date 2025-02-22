const Event = require("../models/event");
const User = require("../models/user");
const mongoose = require('mongoose')
const asyncHandler = require("express-async-handler");

const createEvent = asyncHandler(async (req, res) => {
  const { _id } = req.user; // Lấy ID người dùng từ req.user
  const {
    title,
    description,
    date,
    location,
    capacity,
    logoImage,
    backgroundImage,
  } = req.body;

  // Kiểm tra các trường bắt buộc
  if (!title || !description || !date || !location || !capacity) {
    throw new Error("Missing input to create Event");
  }
  const eventDate = new Date(date);
  if (isNaN(eventDate.getTime())) {
    throw new Error("Invalid date format");
  }
  const dataAdd = {
    ...req.body,
    date: eventDate,
    organizer: _id,
  };
  const response = await Event.create(dataAdd);

  return res.status(200).json({
    success: response ? true : false,
    message: response ? response : "Failed to create event",
  });
});

const updateEvent = asyncHandler(async (req, res) => {
  const { eid } = req.params;
  const { title, description, date, location, capacity, organizerUnit } =
    req.body;

  const event = await Event.findById(eid);
  if (!event) {
    return res.status(404).json({
      success: false,
      mess: "Event not found",
    });
  }

  event.title = title || event.title;
  event.description = description || event.description;
  event.date = date ? new Date(date) : event.date;
  event.location = location || event.location;
  event.capacity = capacity || event.capacity;

  if (organizerUnit) {
    const { name, address, contactInfo } = req.body.organizerUnit;
    const { phone, email } = contactInfo;
    event.organizerUnit = {
      name: name || event.organizerUnit.name,
      address: address || event.organizerUnit.address,
      contactInfo: {
        phone: phone || event.organizerUnit.contactInfo.phone,
        email: email || event.organizerUnit.contactInfo.email,
      },
    };
  }

  const updateEvent = await event.save();
  return res.status(200).json({
    success: true,
    message: "Event updated successfully",
    data: updateEvent,
  });
});

const deleteEvent = asyncHandler(async (req, res) => {
  const { eid } = req.params;
  const event = await Event.findById(eid);

  if (!event) {
    return res.status(404).json({
      success: false,
      message: "Event not found",
    });
  }

  const response = await Event.findByIdAndDelete(eid);

  return res.status(200).json({
    success: true,
    message: response ? "Deleted Successfully" : "Failed to delete",
  });
});

const listAllEvent = asyncHandler(async (req, res) => {
  const result = await Event.find();
  return res.status(200).json({
    success: result ? true : false,
    mess: result ? result : "Some thing went wrong!!!",
  });
});

const listUserRegisEvent = asyncHandler(async (req, res) => {
  const { eid } = req.params;
  const list = await Event.findById(eid).populate(
    "attendees",
    "eventsAttended"
  );

  const dataReturn = list.attendees.map((user) => {
    const data = user?.eventsAttended.map((item) => ({
      status: item?.status,
      registeredAt: item.registeredAt,
    }));
    return {
      name: user?.name,
      statusRegisEvent: data,
    };
  });
  return res.status(200).json({
    success: list ? true : false,
    mess: {
      event: list.title,
      dataReturn,
    },
  });
});


const updateStatus = asyncHandler(async (req, res) => {
  const {eid } = req.params
  const { uid, statusEvent} = req.body;

  // Kiểm tra xem uid và eid có phải là ObjectId hợp lệ không
  if (!mongoose.Types.ObjectId.isValid(uid) || !mongoose.Types.ObjectId.isValid(eid)) {
    return res.status(400).json({
      success: false,
      mess: "Invalid uid or eid. Must be a valid ObjectId.",
    });
  }

  // Cập nhật trạng thái sự kiện
  const updatedStatusEvent = await User.findOneAndUpdate(
    { _id: uid, "eventsAttended.event": eid },
    { $set: { "eventsAttended.$.status": statusEvent } },
    { new: true }
  );
  
  if (!updatedStatusEvent) {
    console.log("User or event not found");
    return res.status(404).json({
      success: false,
      mess: "User or event not found",
    });
  }

  return res.status(200).json({
    success: true,
    mess: "Event status updated successfully",
    data: updatedStatusEvent,
  });
});


module.exports = {
  createEvent,
  updateEvent,
  deleteEvent,
  listAllEvent,
  listUserRegisEvent,
  updateStatus
};
