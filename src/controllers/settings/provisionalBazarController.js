const SettingsModel = require("../../models/settings/settingsModel");
const updateServiceWithDeleteImgForProvisionalBazar = require("../../services/settings/provisionalBazar/updateServiceWithDeleteImgForProvisionalBazar");
const updateServiceWithImgForProvisionalBazar = require("../../services/settings/provisionalBazar/updateServiceWithImgForProvisionalBazar");

exports.pushProvisionalBazar = async (req, res) => {
  let result = await updateServiceWithImgForProvisionalBazar(
    req,
    SettingsModel,
    "provisionalBazar",
    "1536",
    "200"
  );
  return res.status(200).json(result);
};
exports.deleteProvisionalBazar = async (req, res) => {
  let result = await updateServiceWithDeleteImgForProvisionalBazar(
    req,
    SettingsModel
  );
  return res.status(200).json(result);
};
