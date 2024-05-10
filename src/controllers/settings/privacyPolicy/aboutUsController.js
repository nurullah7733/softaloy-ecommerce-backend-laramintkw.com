const SettingsModel = require("../../../models/settings/settingsModel");
const updateServiceWithDeleteImgAboutUs = require("../../../services/settings/privacyPolicy/aboutUsServices/updateServiceWithDeleteImgForAboutUs");
const updateServiceWithImgForAboutUs = require("../../../services/settings/privacyPolicy/aboutUsServices/updateServiceWithImgForAboutUs");

exports.pushAboutUsImg = async (req, res) => {
  let result = await updateServiceWithImgForAboutUs(
    req,
    SettingsModel,
    "privacy-policy",
    "1680",
    "310"
  );
  return res.status(200).json(result);
};
exports.deleteAboutUsImg = async (req, res) => {
  let result = await updateServiceWithDeleteImgAboutUs(req, SettingsModel);
  return res.status(200).json(result);
};
