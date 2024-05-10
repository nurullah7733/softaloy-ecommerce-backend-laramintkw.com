const SettingsModel = require("../../../models/settings/settingsModel");
const updateServiceWithDeleteImgForFaq = require("../../../services/settings/privacyPolicy/faqServices/updateServiceWithDeleteImgForFaq");
const updateServiceWithImgForFaq = require("../../../services/settings/privacyPolicy/faqServices/updateServiceWithImgForFaq");

exports.pushFaqImg = async (req, res) => {
  let result = await updateServiceWithImgForFaq(
    req,
    SettingsModel,
    "privacy-policy",
    "1680",
    "310"
  );
  return res.status(200).json(result);
};
exports.deleteFaqImg = async (req, res) => {
  let result = await updateServiceWithDeleteImgForFaq(req, SettingsModel);
  return res.status(200).json(result);
};
