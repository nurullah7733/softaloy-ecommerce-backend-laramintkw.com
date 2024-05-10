const SettingsModel = require("../../models/settings/settingsModel");
const updateServiceWithDeleteImgForBestSalesBanner = require("../../services/settings/bestSalesImg/updateServiceWithDeleteImgForBestSalesBanner");
const updateServiceWithImgForBestSalesBanner = require("../../services/settings/bestSalesImg/updateServiceWithImgForBestSalesBanner");

exports.pushBestSalesBanner = async (req, res) => {
  let result = await updateServiceWithImgForBestSalesBanner(
    req,
    SettingsModel,
    "bestSales",
    "1536",
    "200"
  );
  return res.status(200).json(result);
};
exports.deleteBestSalesBanner = async (req, res) => {
  let result = await updateServiceWithDeleteImgForBestSalesBanner(
    req,
    SettingsModel
  );
  return res.status(200).json(result);
};
