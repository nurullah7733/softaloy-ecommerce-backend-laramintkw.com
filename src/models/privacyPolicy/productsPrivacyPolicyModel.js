const mongoose = require("mongoose");

var productsPrivacyPolicySchema = mongoose.Schema(
  {
    productsPrivacyPolicy: String,
  },
  { versionKey: false, timestamps: true }
);

var ProductsPrivacyPolicyModel = mongoose.model(
  "privacypolicyproducts",
  productsPrivacyPolicySchema
);
module.exports = ProductsPrivacyPolicyModel;
