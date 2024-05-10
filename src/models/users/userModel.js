const mongoose = require("mongoose");

var userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    photo: {
      type: Array,
    },
    cart: [],
    wishList: [{ type: mongoose.Schema.Types.ObjectId, default: [] }],
    address: {
      street1: String,
      street2: String,
      thana: String,
      city: String,
      state: String,
      country: String,
      zip: String,
    },
    role: {
      type: String,
      default: "user",
      trim: true,
    },
    isBlock: {
      type: String,
      default: "No",
    },
    couponCodeUses: { type: String, default: "0" },
    refreshToken: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

var UserModel = mongoose.model("users", userSchema);
module.exports = UserModel;
