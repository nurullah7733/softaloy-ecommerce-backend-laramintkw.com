const SettingsModel = require("../../models/settings/settingsModel");
const createServiceWithImageForLogoImg = require("../../services/settings/logo/createServiceWithImageForLogoImg");
const updateServiceWithDeleteImgForSettings = require("../../services/settings/logo/updateServiceWithDeleteImgForLogoImg");
const updateServiceWithImgForLogoImg = require("../../services/settings/logo/updateServiceWithImgForLogoImg");

exports.logoUpload = async (req, res) => {
  let result = await createServiceWithImageForLogoImg(
    req,
    SettingsModel,
    "logo",
    "80",
    "80"
  );
  return res.status(200).json(result);
};
exports.deletelogo = async (req, res) => {
  let result = await updateServiceWithDeleteImgForSettings(req, SettingsModel);
  return res.status(200).json(result);
};
exports.pushLogo = async (req, res) => {
  let result = await updateServiceWithImgForLogoImg(
    req,
    SettingsModel,
    "logo",
    "80",
    "80"
  );
  return res.status(200).json(result);
};
