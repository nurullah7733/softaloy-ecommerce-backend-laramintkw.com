const mongoose = require("mongoose");

var termOfUseSchema = mongoose.Schema(
  {
    termOfUse: String,
  },
  { versionKey: false, timestamps: true }
);

var TermOfuseModel = mongoose.model("privacypolicytermofuses", termOfUseSchema);
module.exports = TermOfuseModel;
