const AboutUsModel = require("../../models/privacyPolicy/aboutUsModel");
const createService = require("../../services/common/createService");

const deleteService = require("../../services/common/deleteService");

exports.addAboutUs = async (req, res) => {
  let result = await createService(req, AboutUsModel);
  return res.status(200).json(result);
};

exports.listAboutUs = async (req, res) => {
  let result = await AboutUsModel.find({});
  return res.status(200).json({ status: "success", data: result });
};

exports.deleteAboutUs = async (req, res) => {
  let result = await deleteService(req, AboutUsModel);
  return res.status(200).json(result);
};
