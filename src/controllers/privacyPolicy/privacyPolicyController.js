const PrivacyPolicyModel = require("../../models/privacyPolicy/privacyPolicyModel");
const createService = require("../../services/common/createService");

const deleteService = require("../../services/common/deleteService");

exports.addPrivacyPolicy = async (req, res) => {
  let result = await createService(req, PrivacyPolicyModel);
  return res.status(200).json(result);
};

exports.listPrivacyPolicy = async (req, res) => {
  let result = await PrivacyPolicyModel.find({});
  return res.status(200).json({ status: "success", data: result });
};

exports.deletePrivacyPolicy = async (req, res) => {
  let result = await deleteService(req, PrivacyPolicyModel);
  return res.status(200).json(result);
};
