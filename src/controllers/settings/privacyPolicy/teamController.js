const SettingsModel = require("../../../models/settings/settingsModel");
const updateServiceWithDeleteImgTeamBanner = require("../../../services/settings/privacyPolicy/teamServices/updateServiceWithDeleteImgForTeamBanner");
const updateServiceWithImgForTeamBanner = require("../../../services/settings/privacyPolicy/teamServices/updateServiceWithImgForTeamBanner");

const updateServiceWithDeleteImgTeamImgs = require("../../../services/settings/privacyPolicy/teamServices/updateServiceWithDeleteImgForTeamImgs");
const updateServiceWithImgForTeamImgs = require("../../../services/settings/privacyPolicy/teamServices/updateServiceWithImgForTeamImgs");

// Team Banner
exports.pushTeamBanner = async (req, res) => {
  let result = await updateServiceWithImgForTeamBanner(
    req,
    SettingsModel,
    "privacy-policy",
    "1680",
    "310"
  );
  return res.status(200).json(result);
};
// Delete Team Banner
exports.deleteTeamBanner = async (req, res) => {
  let result = await updateServiceWithDeleteImgTeamBanner(req, SettingsModel);
  return res.status(200).json(result);
};

// Team Imgs
exports.pushTeamImgs = async (req, res) => {
  let result = await updateServiceWithImgForTeamImgs(
    req,
    SettingsModel,
    "privacy-policy",
    "300",
    "300"
  );
  return res.status(200).json(result);
};
// Delete Team Imgs
exports.deleteTeamImgs = async (req, res) => {
  let result = await updateServiceWithDeleteImgTeamImgs(req, SettingsModel);
  return res.status(200).json(result);
};
