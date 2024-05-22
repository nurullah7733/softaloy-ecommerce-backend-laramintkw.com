const ContactUsModel = require("../../models/privacyPolicy/contactUsModel");
const createService = require("../../services/common/createService");

const deleteService = require("../../services/common/deleteService");
const updateService = require("../../services/common/updateService");

exports.addContactUs = async (req, res) => {
  let result = await createService(req, ContactUsModel);
  return res.status(200).json(result);
};

exports.listContactUs = async (req, res) => {
  let result = await ContactUsModel.aggregate([
    {
      $sort: { createdAt: -1 },
    },
  ]);
  return res.status(200).json({ status: "success", data: result });
};

exports.updateContactUs = async (req, res) => {
  let result = await updateService(req, ContactUsModel);
  return res.status(200).json(result);
};
exports.deleteContactUs = async (req, res) => {
  let result = await deleteService(req, ContactUsModel);
  return res.status(200).json(result);
};
