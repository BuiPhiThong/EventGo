const User = require("../models/user");
const Event = require('../models/event')
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const { genAccessToken, genRefreshToken } = require("../middlewares/jwt");
const cookie = require("cookie-parser");

const createUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(409).json({
      success: false,
      mess: "Missing input to create user",
    });
  }
  const existedEmail = await User.findOne({ email: email });
  if (existedEmail) {
    return res.status(409).json({
      success: false,
      mess: "Email has been existed",
    });
  }
  const user = await User.create(req.body);
  return res.status(200).json({
    success: user ? true : false,
    mess: "Create SuccessFully",
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error("Missing input");
  }
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(409).json({
      success: false,
      mess: "User không tồn tại",
    });
  } else {
    const matchesPassword = await bcrypt.compare(password, user?.password);
    if (matchesPassword) {
      const { password, role, ...userData } = user?.toObject();
      const accessToken = genAccessToken(user?._id, role);
      const refreshToken = genRefreshToken(user?._id, role);

      await User.findByIdAndUpdate(
        user?._id,
        {
          refreshToken: refreshToken,
        },
        { new: true }
      );

      res.cookie("refreshToken", refreshToken, {
        maxAge: 7 * 60 * 60 * 24 * 1000,
        httpOnly: true,
      });
      return res.status(200).json({
        success: true,
        accessToken,
        userData: userData,
      });
    }
    return res.status(401).json({
      success: false,
      mess: "Tài khoản hoặc mật khẩu không chính xác",
    });
  }
});

const getCurrent = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const userData = await User.findById(_id).select("-refreshToken -role");

  return res.status(200).json({
    success: userData ? true : false,
    mess: userData ? userData : "Can not get data User",
  });
});

const eventRegistration = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { eventId } = req.body;
  const user = await User.findById(_id);
  if (!user) {
    return res.status(200).json({
      success: false,
      mess: "Can not found user",
    });
  }
  const event = await Event.findById(eventId);
  if (!event) {
    return res.status(404).json({
      success: false,
      message: "Event not found"
    });
  }

  const eventRegisted = user.eventsAttended.find((el)=>el?.event.toString() === eventId)
  
  if(eventRegisted){
    throw new Error('You have registered for this event')
  }
  user.eventsAttended.push({event:eventId})
  event.attendees.push(_id)
  await event.save()
  const userRegisted = await user.save()
  return res.status(200).json({
    success: true,
    message: "Event registered successfully",
    data: userRegisted
  });
});

  const cancellEvent = asyncHandler(async(req,res)=>{
    const {eid} = req.body
    const {_id} = req.user


    const user = await User.findById(_id)
    const filterRegisEvent = user?.eventsAttended.filter((item)=>item.event.toString() !== eid)

    user.eventsAttended = filterRegisEvent
    await user.save()

    return res.status(200).json({
      success:true,
      mess:'Hủy thành công'
    })
  })

// const createUser = async (req, res) => {
//     try {
//         const { name, email, password } = req.body;

//         // Kiểm tra dữ liệu đầu vào
//         if (!name || !email || !password) {
//             return res.status(409).json({
//                 success: false,
//                 mess: "Missing input to create user"
//             });
//         }

//         // Tạo user
//         const user = await User.create(req.body);

//         return res.status(200).json({
//             success: !!user, // Kiểm tra nếu user tồn tại
//             mess: "Create Successfully"
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             mess: error.message
//         });
//     }
// }
module.exports = {
  createUser,
  login,
  getCurrent,
  eventRegistration,
  cancellEvent
};
