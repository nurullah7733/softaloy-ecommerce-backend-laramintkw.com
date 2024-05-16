const mongoose = require("mongoose");

var categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    subCategoryId: [{ type: mongoose.Schema.Types.ObjectId }],
  },
  { versionKey: false, timestamps: true }
);

var CategoryModel = mongoose.model("categories", categorySchema);
module.exports = CategoryModel;
