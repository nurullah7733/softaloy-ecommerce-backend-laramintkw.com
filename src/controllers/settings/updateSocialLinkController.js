const SettingsModel = require("../../models/settings/settingsModel");
const updateService = require("../../services/common/updateService");

exports.updateSocialLink = async (req, res) => {
  let result = await updateService(req, SettingsModel);
  return res.status(200).json(result);
};
