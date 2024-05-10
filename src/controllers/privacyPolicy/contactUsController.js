const ContactUsModel = require("../../models/privacyPolicy/contactUsModel");
const createService = require("../../services/common/createService");

const deleteService = require("../../services/common/deleteService");

exports.addContactUs = async (req, res) => {
  let result = await createService(req, ContactUsModel);
  return res.status(200).json(result);
};

exports.listContactUs = async (req, res) => {
  let result = await ContactUsModel.find({});
  return res.status(200).json({ status: "success", data: result });
};

exports.deleteContactUs = async (req, res) => {
  let result = await deleteService(req, ContactUsModel);
  return res.status(200).json(result);
};
