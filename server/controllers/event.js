const Event = require("../models/event");
const User = require("../models/user");
const mongoose = require("mongoose");
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

const createManyEvent = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  const { events } = req.body;

  if (!Array.isArray(events) || events.length === 0) {
    throw new Error("Events must be a non-empty array");
  }
  const formateEvent = events.map((event) => {
    const { title, description, location, date, capacity } = event;
    if (!title || !description || !location || !date || !capacity) {
      throw new Error("Missing input to insert many event");
    }

    const formatDate = new Date(date);
    if (isNaN(formatDate.getTime())) {
      throw new Error("Invalid date format");
    }

    return {
      ...event,
      date: formatDate,
      organizer: _id,
    };
  });
  const response = await Event.insertMany(formateEvent);

  return res.status(200).json({
    success: response.length > 0 ? true : false,
    message:
      response.length > 0
        ? `${response.length} events created successfully`
        : "Failed to create events",
    events: response,
  });
});

const updateEvent = asyncHandler(async (req, res) => {
  const { eid } = req.params;
  const {
    title,
    description,
    date,
    location,
    capacity,
    organizerUnit,
    category,
    speakerIds
  } = req.body;
  
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
  event.category = category || event.category;
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
  
  if(speakerIds){
    const newSpeaker = speakerIds?.filter((el)=>!event?.speaker?.some((item)=>item.toString()===el))
  
    if(newSpeaker.length >0){
      event.speaker.push(...newSpeaker);//...speaker để tránh bị push mảng lồng vào mảng
    }else{
      return res.status(400).json({
        success:false,
        mess:'All speaker has been existed'
      })
    }
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
  const { eid } = req.params;
  const { uid, statusEvent } = req.body;

  // Kiểm tra xem uid và eid có phải là ObjectId hợp lệ không
  if (
    !mongoose.Types.ObjectId.isValid(uid) ||
    !mongoose.Types.ObjectId.isValid(eid)
  ) {
    return res.status(400).json({
      success: false,
      mess: "Invalid uid or eid. Must be a valid ObjectId.",
    });
  }

  const updatedStatusEvent = await User.findOneAndUpdate(
    { _id: uid, "eventsAttended.event": eid },
    { $set: { "eventsAttended.$.status": statusEvent } },
    { new: true }
  );

  if (!updatedStatusEvent) {
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

const getEventByCategoryLeft = asyncHandler(async (req, res) => {
  
  const technologyEvent = await Event.find({ category: "Technology" }).sort("-date").limit(1);
  const businessEvent = await Event.find({ category: "Business" }).sort("-date").limit(1);
  const designEvent = await Event.find({ category: "Design" }).sort("-date").limit(1);
  const educationEvent = await Event.find({ category: "Education" }).sort("-date").limit(1);

  // Ghép kết quả lại thành mảng
  const result = [...technologyEvent, ...businessEvent, ...designEvent, ...educationEvent];
  
  return res.status(200).json({
    success: result.length === 4, 
    length: result.length,
    mess: result,
  });
});

const getEventByCategoryRight = asyncHandler(async (req, res) => {
  const categories = ["Science", "Health", "Entertainment", "Cuisine"];
  
  // Lấy sự kiện cho mỗi danh mục
  const scienceEvent = await Event.find({ category: "Science" }).sort("-date").limit(1);
  const healthEvent = await Event.find({ category: "Health" }).sort("-date").limit(1);
  const entertainmentEvent = await Event.find({ category: "Entertainment" }).sort("-date").limit(1);
  const cuisineEvent = await Event.find({ category: "Cuisine" }).sort("-date").limit(1);

  // Ghép kết quả lại thành mảng
  const result = [...scienceEvent, ...healthEvent, ...entertainmentEvent, ...cuisineEvent];

  // Trả về kết quả
  return res.status(200).json({
    success: result.length === 4,  // Kiểm tra có đủ 4 sự kiện không
    length: result.length,
    mess: result,
  });
});

const getEventById = asyncHandler(async(req,res)=>{
  const {eid} = req.params

  const response = await Event.findById(eid).populate('speaker','name')

  return res.status(200).json({
    success: response ? true : false,
    mess:response ? response :'Can not found Event!!!'
  })
})

const getEventByCategoryName = asyncHandler(async(req,res)=>{
  const {category} = req.query
  const response = await Event.find({category:category}).populate('speaker','name')

  return res.status(200).json({
    success: response ? true : false,
    mess:response ? response :'Can not found Event!!!'
  })
})

// const getEventByCategoryLeft = asyncHandler(async (req, res) => {
//   const { page = 1, limit = 4 } = req.query;

//   const events = await Event.find({ category: { $in: ["Technology", "Business", "Design", "Education"] } })
//     .sort("-date")
//     .skip((page - 1) * limit)
//     .limit(parseInt(limit));

//   return res.status(200).json({
//     success: true,
//     page: parseInt(page),
//     length: events.length,
//     mess: events,
//   });
// });

// const getEventByCategoryRight = asyncHandler(async (req, res) => {
//   const { page = 1, limit = 4 } = req.query;

//   const events = await Event.find({ category: { $in: ["Science", "Health", "Entertainment", "Cuisine"] } })
//     .sort("-date")
//     .skip((page - 1) * limit)
//     .limit(parseInt(limit));

//   return res.status(200).json({
//     success: true,
//     page: parseInt(page),
//     length: events.length,
//     mess: events,
//   });
// });



// const getEventByCategoryRight = asyncHandler(async (req, res) => {
//   const field = ["Science", "Health", "Entertainment", "Cuisine"];

//   const result = await Event.find({ category: { $in: field } }).sort("-date");

//   return res.status(200).json({
//     success: result ? true : false,
//     length: result.length,
//     mess: result,
//   });
// });



module.exports = {
  createEvent,
  updateEvent,
  deleteEvent,
  listAllEvent,
  listUserRegisEvent,
  updateStatus,
  getEventByCategoryLeft,
  getEventByCategoryRight,
  createManyEvent,
  getEventById,
  getEventByCategoryName
};
