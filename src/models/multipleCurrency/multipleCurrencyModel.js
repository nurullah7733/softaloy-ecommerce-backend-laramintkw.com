const mongoose = require("mongoose");

var multipleCurrencySchema = mongoose.Schema(
  {
    countryName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    currency: {
      type: String,
      required: true,
      trim: true,
    },
    currencyCode: {
      type: String,
      required: true,
      trim: true,
    },
    img: {
      type: Array,
    },
  },
  { versionKey: false, timestamps: true }
);

var MultipleCurrencyModel = mongoose.model(
  "multiplecurrencies",
  multipleCurrencySchema
);
module.exports = MultipleCurrencyModel;
