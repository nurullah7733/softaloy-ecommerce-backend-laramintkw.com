const SettingsModel = require("../../models/settings/settingsModel");
const updateServiceWithDeleteImgForBestOfElectronics = require("../../services/settings/bestOfElectronics/updateServiceWithDeleteImgForBestOfElectronics");
const updateServiceWithImgForBestOfElectronics = require("../../services/settings/bestOfElectronics/updateServiceWithImgForBestOfElectronics");

exports.pushBestOfElectronics = async (req, res) => {
  let result = await updateServiceWithImgForBestOfElectronics(
    req,
    SettingsModel,
    "bestOfElectronics",
    "1536",
    "200"
  );
  return res.status(200).json(result);
};
exports.deleteBestOfElectronics = async (req, res) => {
  let result = await updateServiceWithDeleteImgForBestOfElectronics(
    req,
    SettingsModel
  );
  return res.status(200).json(result);
};
