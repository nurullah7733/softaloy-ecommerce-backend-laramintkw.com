const mongoose = require("mongoose");

var subCategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  { versionKey: false, timestamps: true }
);

var SubCategoryModel = mongoose.model("subcategories", subCategorySchema);
module.exports = SubCategoryModel;
