const SettingsModel = require("../../../models/settings/settingsModel");
const updateServiceWithDeleteImgContactUs = require("../../../services/settings/privacyPolicy/contactUsServices/updateServiceWithDeleteImgForContactUs");
const updateServiceWithImgForContactUs = require("../../../services/settings/privacyPolicy/contactUsServices/updateServiceWithImgForContactUs");

exports.pushContactUsImg = async (req, res) => {
  let result = await updateServiceWithImgForContactUs(
    req,
    SettingsModel,
    "privacy-policy",
    "1680",
    "310"
  );
  return res.status(200).json(result);
};
exports.deleteContactUsImg = async (req, res) => {
  let result = await updateServiceWithDeleteImgContactUs(req, SettingsModel);
  return res.status(200).json(result);
};
