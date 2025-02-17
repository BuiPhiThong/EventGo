const mongoose = require('mongoose'); 

var userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    phone: { type: String },
    address: { type: String },
    profileImage: { type: String },
    role: {
        type: String,
        enum: ["User", "Admin", "Organizer"],
        default: "User",
    },
    refreshToken: { type: String },
    passwordChangeAt: { type: String },
    passwordResetToken: { type: String },
    passwordResetExpire: { type: String },
    deleted: { type: Number, default: 0 },

    // Danh sách sự kiện đã tham gia
    eventsAttended: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }]

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
