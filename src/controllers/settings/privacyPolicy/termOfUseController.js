const SettingsModel = require("../../../models/settings/settingsModel");
const updateServiceWithDeleteImgForTermOfUse = require("../../../services/settings/privacyPolicy/termOfUseServices/updateServiceWithDeleteImgForTermOfUse");
const updateServiceWithImgForTermOfUse = require("../../../services/settings/privacyPolicy/termOfUseServices/updateServiceWithImgForTermOfUse");

exports.pushTermOfUseImg = async (req, res) => {
  let result = await updateServiceWithImgForTermOfUse(
    req,
    SettingsModel,
    "privacy-policy",
    "1680",
    "310"
  );
  return res.status(200).json(result);
};
exports.deleteTermOfUseImg = async (req, res) => {
  let result = await updateServiceWithDeleteImgForTermOfUse(req, SettingsModel);
  return res.status(200).json(result);
};
