const mongoose = require("mongoose");
const bcrypt = require('bcrypt')

const TempRegisterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  regisToken: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
},{
  timestamps:true
});
TempRegisterSchema.pre('save', async function (next) {
  if(!this.isModified("password")){
    next()
  }
  const salt = bcrypt.genSaltSync(10)

  this.password =await bcrypt.hash(this.password,salt)
})

module.exports = mongoose.model("TempRegister", TempRegisterSchema);
