const router = require("express").Router();
const {
  createBrand,
  listBrand,
  updateBrand,
  dropdownListBrand,
  getBrandDetailsById,
  deleteBrandImgAndpullImg,
  deleteBrandWithImg,
} = require("../controllers/brands/brandController");
const {
  createCard,
  getCards,
  removeCardwhenOrder,
  deleteCard,
} = require("../controllers/card/cardController");
const {
  createCateogry,
  listCategory,
  dropdownListCategory,
  getCategoryDetailsById,
  updateCategory,
  deleteCategory,
} = require("../controllers/categories/categoryController");
const {
  createCoupon,
  getCoupon,
  getCouponDetailsById,
  updateCoupon,
  deleteCoupon,
  validateCouponCode,
} = require("../controllers/coupon/couponController");
const {
  createOrder,
  getAllOrderForAdmin,
  getDetailsById,
  changeOrderStatus,
  getRunningOrderForUser,
  getDeliveredOrderForUser,
  getCancelledOrderForUser,
  getReturnedOrderForUser,
} = require("../controllers/order/orderController");
const {
  addProductsPrivacyPolicy,
  updateProductsPrivacyPolicy,
  listProductsPrivacyPolicy,
  deleteProductsPrivacyPolicy,
} = require("../controllers/privacyPolicy/productsPrivacyPolicyController");
const {
  createProduct,
  listProduct,
  dropdownListProduct,
  getProductDetailsById,
  updateProduct,
  deleteProduct,
  listProductForGlobal,
  ratingsProduct,
  deleteProductImgAndPullImg,
  bestSalesProductForGlobal,
  relatedProducts,
  getMegaMenuProductsByCategory,
} = require("../controllers/products/productController");
const {
  pushProvisionalBazar,
  deleteProvisionalBazar,
} = require("../controllers/settings/provisionalBazarController");
const {
  pushBestOfElectronics,
  deleteBestOfElectronics,
} = require("../controllers/settings/bestOfElectronicsController");
const {
  pushBestSalesBanner,
  deleteBestSalesBanner,
} = require("../controllers/settings/bestSalesBannerController");
const {
  logoUpload,
  deletelogo,
  pushLogo,
} = require("../controllers/settings/logoUploadController");
const {
  deleteMainSlider,
  createMainSlider,
  updateMainSliderWithImg,
  deleteImgMainSlider,
  getMainSliders,
  getMainSliderDetailsById,
} = require("../controllers/settings/mainSliderController");
const {
  updateShippingAndOtherCost,
  getAllWebSetting,
} = require("../controllers/settings/updateShippingAndOtherCostController");
const {
  updateSocialLink,
} = require("../controllers/settings/updateSocialLinkController");

const {
  createSubCategory,
  listSubCategories,
  dropdownListSubCategories,
  getSubCategoryDetailsById,
  updateSubCategory,
  deleteSubCategory,
} = require("../controllers/subCategory/subCategoryController");
const {
  createSubSubCategory,
  listSubSubCategories,
  getSubSubCategoryDetailsById,
  updateSubSubCategory,
  deleteSubSubCategory,
} = require("../controllers/subSubCategory/subSubCategoryController");
const {
  salesSummary,
  cancelSummary,
  orderSummary,
  runningOrderSummary,
  salesSummaryReport,
  cancelSummaryReport,
  allOrderSummaryReport,
  runningOrderSummaryReport,
  refundSummary,
  returnSummary,
  returnedSummaryReport,
} = require("../controllers/summary/summaryController");

const {
  deleteImages,
  uploadImages,
} = require("../controllers/upload/uploadController");

const {
  registration,
  login,
  userDetailsById,
  userUpdate,
  allUser,
  verifyEmail,
  verifyOtp,
  resetPassword,
  adminLogin,
  saveUserAddress,
  allAdmin,
  logOut,
  addToCart,
  contactUsForm,
} = require("../controllers/user/userController");

const {
  createAndRemoveWishList,
  getWishList,
} = require("../controllers/wishList/wishListController");
const { uploadPhoto } = require("../middlewares/uploadImgMiddleware");
const verifyAdminMiddleware = require("../middlewares/verifyAdminMiddleware");
const verifyAuthMiddleware = require("../middlewares/verifyAuthMiddleware");

const {
  addFaq,
  listFaq,
  deleteFaq,
} = require("../controllers/privacyPolicy/faqController");
const {
  addAboutUs,
  listAboutUs,
  deleteAboutUs,
} = require("../controllers/privacyPolicy/aboutUsController");
const {
  addTermOfUse,
  listTermOfUse,
  deleteTermOfUse,
} = require("../controllers/privacyPolicy/termOfUseController");
const {
  pushTermOfUse,
  pushTermOfUseImg,
  deleteTermOfUseImg,
} = require("../controllers/settings/privacyPolicy/termOfUseController");
const {
  pushAboutUsImg,
  deleteAboutUsImg,
} = require("../controllers/settings/privacyPolicy/aboutUsController");
const {
  pushFaqImg,
  deleteFaqImg,
} = require("../controllers/settings/privacyPolicy/faqController");
const {
  pushPrivacyPolicyImg,
  deletePrivacyPolicyImg,
} = require("../controllers/settings/privacyPolicy/privacyPolicyController");
const {
  pushDealerBrandLogoImg,
  deleteDealerBrandLogoImg,
} = require("../controllers/settings/privacyPolicy/dealerBrandLogo");
const {
  addPrivacyPolicy,
  listPrivacyPolicy,
  deletePrivacyPolicy,
} = require("../controllers/privacyPolicy/privacyPolicyController");
const {
  addContactUs,
  listContactUs,
  deleteContactUs,
} = require("../controllers/privacyPolicy/contactUsController");
const {
  addTeam,
  listTeam,
  deleteTeam,
} = require("../controllers/privacyPolicy/teamController");
const {
  pushContactUsImg,
  deleteContactUsImg,
} = require("../controllers/settings/privacyPolicy/contactUsController");
const {
  pushTeamBanner,
  deleteTeamBanner,
  pushTeamImgs,
  deleteTeamImgs,
} = require("../controllers/settings/privacyPolicy/teamController");

const {
  createMultipleCurrency,
  listMultipleCurrency,
  getMultipleCurrencyDetailsById,
  updateMultipleCurrency,
  deleteMultipleCurrencyImgAndpullImg,
  deleteMultipleCurrencyImgWithImg,
} = require("../controllers/multipleCurrency/multipleCurrencyController");

// registration
router.post("/registration", registration);
// login
router.post("/login", login);
router.get("/logout", verifyAuthMiddleware, logOut);
router.post("/admin-login", adminLogin);
// user details for user
router.get("/user-detail-by-user", verifyAuthMiddleware, userDetailsById);
// user details for Admin
router.get(
  "/user-detail-by-admin/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  userDetailsById
);
// user Udpate for User
router.post(
  "/user-udpate-by-user/:id",
  verifyAuthMiddleware,
  uploadPhoto.array("images", 10),
  userUpdate
);
// user Udpate for Admin
router.post(
  "/user-udpate-by-admin/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  userUpdate
);

// all user for admin
router.get(
  "/all-user/:pageNo/:perPage/:searchKeyword",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  allUser
);
// all admin for admin
router.get(
  "/all-admin/:pageNo/:perPage/:searchKeyword",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  allAdmin
);

// save address
router.post("/save-address/:id", verifyAuthMiddleware, saveUserAddress);
// Add to cart
router.post("/add-to-cart/:id", verifyAuthMiddleware, addToCart);

//------------------------------ contact form----------------------------------------------------------------
router.post("/contact-us-form", contactUsForm);
//------------------------------ Reset password----------------------------------------------------------------------------
// step 01
router.get("/verify-email/:email", verifyEmail);
// step 02
router.get("/verify-otp/:email/:otp", verifyOtp);
// step 03
router.post("/reset-password", resetPassword);

//------------------------------ Category ----------------------------------------------------------------------------
// Create Category
router.post(
  "/create-category",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  uploadPhoto.array("images", 10),
  createCateogry
);
// list Category
router.get(
  "/list-category/:pageNo/:perPage/:searchKeyword",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  listCategory
);
// dropdown list Category global
router.get(
  "/dropdown-category/:pageNo/:perPage/:searchKeyword",
  dropdownListCategory
);
// get category details by id
router.get(
  "/category-details/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  getCategoryDetailsById
);
// update category
router.post(
  "/update-category/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  updateCategory
);
// delete category
router.get(
  "/delete-category/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  deleteCategory
);

//------------------------------ Sub-Categories ----------------------------------------------------------------------------
// create subcategory
router.post(
  "/create-subcategory",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  createSubCategory
);

// list subcategory
router.get(
  "/list-subcategory/:pageNo/:perPage/:searchKeyword",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  listSubCategories
);
// dropdown list subcategory Global
router.get(
  "/dropdown-subcategory/:pageNo/:perPage/:searchKeyword",
  dropdownListSubCategories
);
// get subcategory details by id
router.get(
  "/subcategory-details/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  getSubCategoryDetailsById
);
// update subcategory
router.post(
  "/update-subcategory/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  updateSubCategory
);
// delete subcategory
router.get(
  "/delete-subcategory/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  deleteSubCategory
);

//------------------------------ Sub-Sub-Categories ----------------------------------------------------------------------------
// create sub subcategory
router.post(
  "/create-sub-subcategory",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  createSubSubCategory
);

// list sub subcategory
router.get(
  "/list-sub-subcategory/:pageNo/:perPage/:searchKeyword",
  listSubSubCategories
);

// get sub subcategory details by id
router.get(
  "/sub-subcategory-details/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  getSubSubCategoryDetailsById
);
// update sub subcategory
router.post(
  "/update-sub-subcategory/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  updateSubSubCategory
);
// delete sub subcategory
router.get(
  "/delete-sub-subcategory/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  deleteSubSubCategory
);

//------------------------------ Brands  ------------------------------------
// create brand
router.post(
  "/create-brand",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  uploadPhoto.array("images", 10),
  createBrand
);

// list Brand
router.get("/list-brand/:pageNo/:perPage/:searchKeyword", listBrand);
// dropdown list brand
router.get(
  "/dropdown-brand-admin",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  dropdownListBrand
);
// dropdown list brand for Global
router.get("/dropdown-brand", dropdownListBrand);
// get brand details by id
router.get(
  "/brand-details/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  getBrandDetailsById
);
// update brand
router.post(
  "/update-brand/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  uploadPhoto.array("images", 10),
  updateBrand
);
// delete brand img
router.post(
  "/delete-brand-img/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  deleteBrandImgAndpullImg
);

// delete brand
router.get(
  "/delete-brand/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  deleteBrandWithImg
);

//------------------------------  Multiple Currency  ------------------------------------
// create MultipleCurrency
router.post(
  "/create-multipleCurrency",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  uploadPhoto.array("images", 10),
  createMultipleCurrency
);

// list MultipleCurrency
router.get(
  "/list-multiple-currency/:pageNo/:perPage/:searchKeyword",

  listMultipleCurrency
);

// get MultipleCurrency details by id
router.get(
  "/multiple-currency-details/:id",

  getMultipleCurrencyDetailsById
);

// update MultipleCurrency
router.post(
  "/update-multiple-currency/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  uploadPhoto.array("images", 10),
  updateMultipleCurrency
);

// delete MultipleCurrency img
router.post(
  "/delete-multiple-currency-img/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  deleteMultipleCurrencyImgAndpullImg
);

// delete MultipleCurrency
router.get(
  "/delete-multiple-currency/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  deleteMultipleCurrencyImgWithImg
);

//------------------------------ product ----------------------------------------------------------------------------
// create product
router.post(
  "/create-product",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  uploadPhoto.array("images", 10),
  createProduct
);

// list product for Global
router.get("/list-product-global", listProductForGlobal);
// Best Sales product for Global
router.get(
  "/best-sales/:pageNo/:perPage/:searchKeyword",
  bestSalesProductForGlobal
);

// list product for mega menu by category
router.get("/list-mega-menu-products", getMegaMenuProductsByCategory);

// get product details by id
router.get("/product-details/:id", getProductDetailsById);

router.get("/related-products/:subCategory", relatedProducts);

// update product
router.post(
  "/update-product/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  uploadPhoto.array("images", 10),
  updateProduct
);
// delete product
router.get(
  "/delete-product/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  deleteProduct
);
// delete product Img
router.post(
  "/delete-product-img/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  deleteProductImgAndPullImg
);
// ratings product
router.post("/ratings-product/:id", verifyAuthMiddleware, ratingsProduct);

// -------------------------- Wish List -------------------------------------------------
router.post("/wishlist", verifyAuthMiddleware, createAndRemoveWishList);
router.get(
  "/getWishList/:pageNo/:perPage/:searchKeyword",
  verifyAuthMiddleware,
  getWishList
);

// -------------------------- Coupon code -------------------------------------------------
router.post(
  "/coupon",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  createCoupon
);
router.get(
  "/all-coupon/:pageNo/:perPage/:searchKeyword",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  getCoupon
);
router.get(
  "/coupon-details/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  getCouponDetailsById
);
router.post(
  "/update-coupon",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  updateCoupon
);
router.get(
  "/delete-coupon/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  deleteCoupon
);
router.post("/validate-coupon-code", verifyAuthMiddleware, validateCouponCode);

// ------------------------- Upload Img ------------------------------------------------
router.post("/upload-img", uploadPhoto.array("images", 10), uploadImages);
router.get("/delete-img/:id", deleteImages);

// ------------------------- Card -------------------------------------------------------------
router.post("/create-card", verifyAuthMiddleware, createCard);
router.get(
  "/get-cards/:pageNo/:perPage/:searchKeyword",
  verifyAuthMiddleware,
  getCards
);
router.post(
  "/remove-card-when-order",
  verifyAuthMiddleware,
  removeCardwhenOrder
);
router.get("/delete-card/:id", verifyAuthMiddleware, deleteCard);

// ------------------------- Order -------------------------------------------------------------
router.post("/create-order", verifyAuthMiddleware, createOrder);
// get all order for admin only
router.get(
  "/get-all-order-for-admin/:pageNo/:perPage/:searchKeyword",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  getAllOrderForAdmin
);
// get running order for user only
router.get(
  "/get-running-order/:pageNo/:perPage/:searchKeyword",
  verifyAuthMiddleware,
  getRunningOrderForUser
);
// get Delivered order for user only
router.get(
  "/get-delivered-order/:pageNo/:perPage/:searchKeyword",
  verifyAuthMiddleware,
  getDeliveredOrderForUser
);
// get Cancelled order for user only
router.get(
  "/get-cancelled-order/:pageNo/:perPage/:searchKeyword",
  verifyAuthMiddleware,
  getCancelledOrderForUser
);
// get Returned order for user only
router.get(
  "/get-returned-order/:pageNo/:perPage/:searchKeyword",
  verifyAuthMiddleware,
  getReturnedOrderForUser
);

// get order details for admin only
router.get(
  "/get-order-details-for-admin/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  getDetailsById
);

// get order details for user only
router.get("/get-order-details/:id", verifyAuthMiddleware, getDetailsById);
// change orderStatus for Admin
router.post(
  "/change-order-status-for-admin/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  changeOrderStatus
);
// change orderStatus for User
router.post(
  "/change-order-status/:id",
  verifyAuthMiddleware,
  changeOrderStatus
);

// ---------------------Summary--------------------------------
// Order Summary
router.get(
  "/order-summary",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  orderSummary
);
router.get(
  "/refund-summary",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  refundSummary
);
// All Order Summary Report
router.post(
  "/order-summary-report",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  allOrderSummaryReport
);

// Running Order Summary
router.get(
  "/running-order-summary",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  runningOrderSummary
);
// Running Order Summary Report
router.post(
  "/running-order-summary-report",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  runningOrderSummaryReport
);

// Sales summary
router.get(
  "/sales-summary",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  salesSummary
);
// Sales summary Report
router.post(
  "/sales-summary-report",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  salesSummaryReport
);
// cancel Summary
router.get(
  "/cancel-summary",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  cancelSummary
);
router.post(
  "/cancel-summary-report",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  cancelSummaryReport
);

// return Summary
router.get(
  "/return-summary",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  returnSummary
);
// return Summary Report
router.post(
  "/return-summary-report",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  returnedSummaryReport
);

//-------------------------- Settings -----------------------------------------------
//-------------------------- logo -----------------------------------------------

router.post(
  "/upload-logo",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  uploadPhoto.array("images", 10),
  logoUpload
);
router.post(
  "/delete-logo/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  deletelogo
);
router.post(
  "/update-logo/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  uploadPhoto.array("images", 10),
  pushLogo
);
// -------- Main Slider -------------------------------------------
router.get(
  "/get-all-main-slider/:pageNo/:perPage/:searchKeyword",
  getMainSliders
);
router.get("/get-main-slider-details/:id", getMainSliderDetailsById);
router.post(
  "/add-main-slider",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  uploadPhoto.array("images", 10),
  createMainSlider
);
router.post(
  "/update-main-slider/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  uploadPhoto.array("images", 10),
  updateMainSliderWithImg
);
router.post(
  "/delete-img-main-slider/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  deleteImgMainSlider
);
router.post(
  "/delete-main-slider/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  deleteMainSlider
);
// -------- Terms of use -------------------------------------------
router.post(
  "/add-term-of-use/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  uploadPhoto.array("images", 10),
  pushTermOfUseImg
);
router.post(
  "/delete-term-of-use/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  deleteTermOfUseImg
);
// -------- About us -------------------------------------------
router.post(
  "/add-about-us/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  uploadPhoto.array("images", 10),
  pushAboutUsImg
);
router.post(
  "/delete-about-us/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  deleteAboutUsImg
);
// -------- Contact us -------------------------------------------
router.post(
  "/add-contact-us/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  uploadPhoto.array("images", 10),
  pushContactUsImg
);
router.post(
  "/delete-contact-us/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  deleteContactUsImg
);
// -------- Team -------------------------------------------
router.post(
  "/add-team-banner/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  uploadPhoto.array("images", 10),
  pushTeamBanner
);
router.post(
  "/delete-team-banner/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  deleteTeamBanner
);
router.post(
  "/add-team-imgs/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  uploadPhoto.array("images", 10),
  pushTeamImgs
);
router.post(
  "/delete-team-imgs/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  deleteTeamImgs
);
// -------- faq -------------------------------------------
router.post(
  "/add-faq/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  uploadPhoto.array("images", 10),
  pushFaqImg
);
router.post(
  "/delete-faq/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  deleteFaqImg
);
// -------- Privacy Policy -------------------------------------------
router.post(
  "/add-privacy-policy/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  uploadPhoto.array("images", 10),
  pushPrivacyPolicyImg
);
router.post(
  "/delete-privacy-policy/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  deletePrivacyPolicyImg
);
// -------- Dealer Brand Logo -------------------------------------------
router.post(
  "/add-dealer-brand-logo/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  uploadPhoto.array("images", 10),
  pushDealerBrandLogoImg
);
router.post(
  "/delete-dealer-brand-logo/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  deleteDealerBrandLogoImg
);
// -------- BestSales Banner -------------------------------------------
router.post(
  "/add-best-sales-banner/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  uploadPhoto.array("images", 10),
  pushBestSalesBanner
);
router.post(
  "/delete-best-sales-banner/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  deleteBestSalesBanner
);
// -------- provisionalBazar Banner -------------------------------------------
router.post(
  "/add-provisional-bazar-banner/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  uploadPhoto.array("images", 10),
  pushProvisionalBazar
);
router.post(
  "/delete-provisional-bazar-banner/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  deleteProvisionalBazar
);
// -------- bestOfElectronics Banner -------------------------------------------
router.post(
  "/add-best-of-electronics-banner/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  uploadPhoto.array("images", 10),
  pushBestOfElectronics
);
router.post(
  "/delete-best-of-electronics-banner/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  deleteBestOfElectronics
);

// -------- Shipping cost -------------------------------------------
router.post(
  "/udpate-shipping-and-other-cost/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  updateShippingAndOtherCost
);
// -------- Social link -------------------------------------------
router.post(
  "/udpate-social-link/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  updateSocialLink
);
router.get("/get-all-web-settings", getAllWebSetting);

// --------------------------------------- Privacy Policy --------------------------------------

// add products privacy policy
router.get("/list-products-privacy-policy", listProductsPrivacyPolicy);

router.post(
  "/add-products-privacy-policy",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  addProductsPrivacyPolicy
);

router.get(
  "/delete-products-privacy-policy/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  deleteProductsPrivacyPolicy
);

// add faq questions
router.post("/add-faq", verifyAuthMiddleware, verifyAdminMiddleware, addFaq);

router.get("/list-faq", listFaq);

router.get(
  "/delete-faq-question/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  deleteFaq
);

// about us privacy policy
router.post(
  "/add-about-us",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  addAboutUs
);

router.get("/list-about-us", listAboutUs);

router.get(
  "/delete-about-us/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  deleteAboutUs
);
// Terms of use privacy policy
router.post(
  "/add-term-of-use",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  addTermOfUse
);

router.get("/list-term-of-use", listTermOfUse);

router.get(
  "/delete-term-of-use/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  deleteTermOfUse
);
// Privacy policy
router.post(
  "/add-privacy-policy",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  addPrivacyPolicy
);

router.get("/list-privacy-policy", listPrivacyPolicy);

router.get(
  "/delete-privacy-policy/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  deletePrivacyPolicy
);
// Contact us
router.post(
  "/add-contact-us",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  addContactUs
);

router.get("/list-contact-us", listContactUs);

router.get(
  "/delete-contact-us/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  deleteContactUs
);
// Team
router.post("/add-team", verifyAuthMiddleware, verifyAdminMiddleware, addTeam);

router.get("/list-team", listTeam);

router.get(
  "/delete-team/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  deleteTeam
);

module.exports = router;
