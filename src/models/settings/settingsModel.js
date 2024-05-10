const mongoose = require("mongoose");

var settingsSchema = mongoose.Schema(
  {
    logoImg: { type: Array },
    bestSales: { type: Array },
    provisionalBazar: { type: Array },
    bestOfElectronics: { type: Array },

    shippingCostThakurgaonSadar: { type: Number, default: 0 },
    otherCostThakurgaonSadar: { type: Number, default: 0 },

    shippingCostThakurgaon: { type: Number, default: 0 },
    otherCostThakurgaon: { type: Number, default: 0 },

    shippingCostDhaka: { type: Number, default: 0 },
    otherCostDhaka: { type: Number, default: 0 },

    shippingCost: { type: Number, default: 0 },
    otherCost: { type: Number, default: 0 },

    socialLink: {
      facebook: String,
      twitter: String,
      instagram: String,
      youtube: String,
      whatsapp: String,
      wechat: String,
      tiktok: String,
      linkedin: String,
    },
    termOfUse: { type: Array },
    faqImg: { type: Array },
    aboutUsImg: { type: Array },
    privacyPolicyImg: { type: Array },
    dealerBrandLogo: { type: Array },
    contactUsImg: { type: Array },
    teamImgBanner: { type: Array },
    teamImgs: { type: Array },
  },
  { versionKey: false, timestamps: true }
);

var SettingsModel = mongoose.model("settings", settingsSchema);
module.exports = SettingsModel;
