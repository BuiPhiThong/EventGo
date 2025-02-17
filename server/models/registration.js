const mongoose = require("mongoose"); // Erase if already required

const registrationSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    }, // Sự kiện đăng ký
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Người đăng ký
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    }, // Trạng thái đăng ký
    registeredAt: { type: Date, default: Date.now }, // Ngày đăng ký
  },
  { timestamps: true }
);

module.exports = mongoose.model("Registration", registrationSchema);
