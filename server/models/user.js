const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { type } = require("os");
var userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
    profileImage: { type: String },
    role: {
      type: String,
      enum: ["User", "Admin"],
      default: "User",
    },
    eventsAttended: [
      {
        event: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
        status: {
          type: String,
          enum: ["pending", "confirmed", "cancelled"],
          default: "pending",
        },
        registeredAt: { type: Date, default: Date.now },
        feedbacks: [
          {
            comment: { type: String },
            createdAt: { type: Date, default: Date.now }, // Thời gian tạo feedback
            updatedAt: { type: Date, default: Date.now }, // Thời gian cập nhật feedback
          },
        ],
      },
    ],

    deleted: { type: Number, default: 0 },
    refreshToken: { type: String },
    passwordChangeAt: { type: String },
    passwordResetToken: { type: String },
    passwordResetExpire: { type: String },
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = bcrypt.genSaltSync(10);

  this.password = await bcrypt.hash(this.password, salt);
});
module.exports = mongoose.model("User", userSchema);
