const SettingsModel = require("../../../models/settings/settingsModel");
const updateServiceWithDeleteImgForDealerBrandLogo = require("../../../services/settings/privacyPolicy/dealerBrandLogo/updateServiceWithDeleteImgForDealerBrandLogo");
const updateServiceWithImgForDealerBrandLogo = require("../../../services/settings/privacyPolicy/dealerBrandLogo/updateServiceWithImgForDealerBrandLogo");

exports.pushDealerBrandLogoImg = async (req, res) => {
  let result = await updateServiceWithImgForDealerBrandLogo(
    req,
    SettingsModel,
    "privacy-policy",
    "300",
    "100"
  );
  return res.status(200).json(result);
};
exports.deleteDealerBrandLogoImg = async (req, res) => {
  let result = await updateServiceWithDeleteImgForDealerBrandLogo(
    req,
    SettingsModel
  );
  return res.status(200).json(result);
};
