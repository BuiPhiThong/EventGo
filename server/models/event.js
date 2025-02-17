const mongoose = require("mongoose"); // Erase if already required

var eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    endDate: { type: Date },
    location: { type: String, required: true },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    views:{
        type:Number,
        default:0
    },
    capacity: { type: Number, required: true },
    price: { type: Number, default: 0 }, // 0 if free
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    category: { type: String, required: true },
    imageUrl: { type: String },
    status: {
      type: String,
      enum: ["upcoming", "ongoing", "completed", "cancelled"],
      default: "upcoming",
    },
    sponsors: [{ name: String, logoUrl: String }],
    speakers: [{ name: String, bio: String, photoUrl: String }],
    schedule: [
      {
        time: String,
        activity: String,
        speaker: { name: String, bio: String, photoUrl: String },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
