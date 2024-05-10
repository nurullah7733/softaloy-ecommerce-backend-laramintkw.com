const SettingsModel = require("../../models/settings/settingsModel");
const updateService = require("../../services/common/updateService");

exports.getAllWebSetting = async (req, res) => {
  let result = await SettingsModel.find();
  return res.status(200).json({ status: "success", data: result });
};
exports.updateShippingAndOtherCost = async (req, res) => {
  let result = await updateService(req, SettingsModel);
  return res.status(200).json(result);
};
