const TermOfUseModel = require("../../models/privacyPolicy/termOfUseModel");
const createService = require("../../services/common/createService");
const deleteService = require("../../services/common/deleteService");

exports.addTermOfUse = async (req, res) => {
  let result = await createService(req, TermOfUseModel);
  return res.status(200).json(result);
};

exports.listTermOfUse = async (req, res) => {
  let result = await TermOfUseModel.find({});
  return res.status(200).json({ status: "success", data: result });
};

exports.deleteTermOfUse = async (req, res) => {
  let result = await deleteService(req, TermOfUseModel);
  return res.status(200).json(result);
};
