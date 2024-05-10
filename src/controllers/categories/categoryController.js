const mongoose = require("mongoose");
const CategoryModel = require("../../models/category/categoryModel");
const ProductModel = require("../../models/product/productModel");
const listService = require("../../services/common/listService");
const dropdownListService = require("../../services/common/dropdownListService");
const getServiceById = require("../../services/common/getSerciceById");
const checkAssociateService = require("../../services/common/checkAssociateService");
const createServiceWithImage = require("../../services/common/createServiceWithImage");
const updateServiceWithDeleteImg = require("../../services/common/updateServiceWithDeleteImg");
const updateServiceWithImg = require("../../services/common/updateServiceWithImg");
const deleteServiceWithImg = require("../../services/common/deleteServiceWithImg");
const listOneJoinServiceWithOutEmail = require("../../services/common/listOneJoinServiceWithOutEmail");

exports.createCateogry = async (req, res) => {
  let result = await createServiceWithImage(
    req,
    CategoryModel,
    "categories",
    80,
    80
  );
  return res.status(200).json(result);
};
exports.listCategory = async (req, res) => {
  let searchRgx = { $regex: req.params.searchKeyword, $options: "i" };
  let searchArray = [{ name: searchRgx }];
  let result = await listService(req, CategoryModel, searchArray);
  return res.status(200).json(result);
};
exports.dropdownListCategory = async (req, res) => {
  let searchRgx = { $regex: req.params.searchKeyword, $options: "i" };
  let searchArray = [{ name: searchRgx }];
  let joinStage1 = {
    $lookup: {
      from: "subcategories",
      localField: "subCategoryId",
      foreignField: "_id",
      as: "subCategory",
    },
  };
  let data = await listOneJoinServiceWithOutEmail(
    req,
    CategoryModel,
    searchArray,
    joinStage1
  );
  return res.status(200).json(data);
};
exports.getCategoryDetailsById = async (req, res) => {
  let result = await getServiceById(req, CategoryModel);
  return res.status(200).json(result);
};
exports.updateCategory = async (req, res) => {
  let result = await updateServiceWithImg(
    req,
    CategoryModel,
    "categories",
    80,
    80
  );
  return res.status(200).json(result);
};
exports.deleteCategoryImgAndpullImg = async (req, res) => {
  let result = await updateServiceWithDeleteImg(req, CategoryModel);
  return res.status(200).json(result);
};
exports.deleteCategoryWithImg = async (req, res) => {
  let id = req.params.id;
  let objectId = mongoose.Types.ObjectId;
  let queryObject = { categoryId: objectId(id) };

  let isDelete = await checkAssociateService(queryObject, ProductModel);
  if (isDelete === true) {
    return res.status(200).json({
      status: "associate",
      data: "This category associate to products",
    });
  } else {
    let result = await deleteServiceWithImg(req, CategoryModel);
    return res.status(200).json(result);
  }
};
