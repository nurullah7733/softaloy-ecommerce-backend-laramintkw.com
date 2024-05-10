const SettingsModel = require("../../../models/settings/settingsModel");
const updateServiceWithDeleteImgForPrivacyPolicy = require("../../../services/settings/privacyPolicy/privacyPolicy/updateServiceWithDeleteImgForPrivacyPolicy");
const updateServiceWithImgForPrivacyPolicy = require("../../../services/settings/privacyPolicy/privacyPolicy/updateServiceWithImgForPrivacyPolicy");

exports.pushPrivacyPolicyImg = async (req, res) => {
  let result = await updateServiceWithImgForPrivacyPolicy(
    req,
    SettingsModel,
    "privacy-policy",
    "1680",
    "310"
  );
  return res.status(200).json(result);
};
exports.deletePrivacyPolicyImg = async (req, res) => {
  let result = await updateServiceWithDeleteImgForPrivacyPolicy(
    req,
    SettingsModel
  );
  return res.status(200).json(result);
};
