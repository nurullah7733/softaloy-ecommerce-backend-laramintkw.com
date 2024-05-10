let mongoose = require("mongoose");
const OrderModel = require("../../models/order/orderModel");
const getDetailsByIdTwoJoinService = require("../../services/common/getDetailsByIdTwoJoinService");
const listTwoJoinService = require("../../services/common/listTwoJoinService");
const updateServiceOrderChangeStatus = require("../../services/order/updateServiceChangeOrderStatus");
var uniqid = require("uniqid");
const createServiceWithIncreaseDecreaseItem = require("../../services/order/createServiceWithIncreaseDecreaseItem");
const runningOrderServices = require("../../services/order/runningOrderServices");
const deliveredOrderServices = require("../../services/order/deliveredOrderServices");
const cancelledOrderServices = require("../../services/order/cancelledOrderServices");
const returnedOrderServices = require("../../services/order/returnedOrderServices");

exports.createOrder = async (req, res) => {
  let reqBody = req.body;
  let orderId = uniqid.process();
  reqBody.orderId = orderId;
  reqBody.userId = req.headers.userId;
  reqBody["paymentIntent"] = {
    paymentId: "",
    amount: reqBody.grandTotal,
  };

  let result = await createServiceWithIncreaseDecreaseItem(req, OrderModel);
  return res.status(200).json(result);
};

// for admin
exports.getAllOrderForAdmin = async (req, res) => {
  let searchRgx = { $regex: req.params.searchKeyword, $options: "i" };
  let searchArray = [
    { tran_id: searchRgx },
    { orderId: searchRgx },
    { "paymentIntent.paymentMethod": searchRgx },
    { note: searchRgx },
    { "userDetails.firstName": searchRgx },
    { "userDetails.lastName": searchRgx },
    { "userDetails.email": searchRgx },
    { "userDetails.mobile": searchRgx },
    { "productsDetails.name": searchRgx },

    { "shippingAddress.name": searchRgx },
    { "shippingAddress.email": searchRgx },
    { "shippingAddress.mobile": searchRgx },
    { "shippingAddress.alternativeMobile": searchRgx },
    { "shippingAddress.city": searchRgx },
    { "shippingAddress.country": searchRgx },
    { "shippingAddress.address": searchRgx },
    { "allProducts.name": searchRgx },
    { tran_id: searchRgx },
  ];
  if (
    req.params.searchKeyword.length == 12 ||
    req.params.searchKeyword.length == 24
  ) {
    searchArray.push(
      { userId: mongoose.Types.ObjectId(req.params.searchKeyword) },
      {
        "productsDetails._id": mongoose.Types.ObjectId(
          req.params.searchKeyword
        ),
      }
    );
  }

  let joinStage1 = {
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "userDetails",
      pipeline: [
        {
          $project: {
            _id: 1,
            firstName: 1,
            lastName: 1,
            email: 1,
            mobile: 1,
            photo: 1,
          },
        },
      ],
    },
  };
  let joinStage2 = {
    $lookup: {
      from: "products",
      localField: "allProducts.productId",
      foreignField: "_id",
      as: "productsDetails",
      pipeline: [
        {
          $project: {
            ratings: 0,
          },
        },
      ],
    },
  };
  let result = await listTwoJoinService(
    req,
    OrderModel,
    searchArray,
    joinStage1,
    joinStage2
  );
  return res.status(200).json(result);
};

// for user
exports.getRunningOrderForUser = async (req, res) => {
  let searchRgx = { $regex: req.params.searchKeyword, $options: "i" };
  let searchArray = [
    { orderId: searchRgx },
    { "paymentIntent.paymentMethod": searchRgx },
    { note: searchRgx },
    { "userDetails.firstName": searchRgx },
    { "userDetails.lastName": searchRgx },
    { "userDetails.email": searchRgx },
    { "userDetails.mobile": searchRgx },

    { "productsDetails.name": searchRgx },
  ];
  if (
    req.params.searchKeyword.length == 12 ||
    req.params.searchKeyword.length == 24
  ) {
    searchArray.push(
      { userId: mongoose.Types.ObjectId(req.params.searchKeyword) },
      {
        "productsDetails._id": mongoose.Types.ObjectId(
          req.params.searchKeyword
        ),
      }
    );
  }
  let joinStage1 = {
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "userDetails",
      pipeline: [
        {
          $project: {
            _id: 1,
            firstName: 1,
            lastName: 1,
            email: 1,
            mobile: 1,
            photo: 1,
          },
        },
      ],
    },
  };
  let joinStage2 = {
    $lookup: {
      from: "products",
      localField: "allProducts.productId",
      foreignField: "_id",
      as: "productsDetails",
      pipeline: [
        {
          $project: {
            ratings: 0,
          },
        },
      ],
    },
  };
  let result = await runningOrderServices(
    req,
    OrderModel,
    searchArray,
    joinStage1,
    joinStage2
  );
  return res.status(200).json(result);
};
exports.getDeliveredOrderForUser = async (req, res) => {
  let searchRgx = { $regex: req.params.searchKeyword, $options: "i" };
  let searchArray = [
    { orderId: searchRgx },
    { "paymentIntent.paymentMethod": searchRgx },
    { note: searchRgx },
    { "userDetails.firstName": searchRgx },
    { "userDetails.lastName": searchRgx },
    { "userDetails.email": searchRgx },
    { "userDetails.mobile": searchRgx },

    { "productsDetails.name": searchRgx },
  ];
  if (
    req.params.searchKeyword.length == 12 ||
    req.params.searchKeyword.length == 24
  ) {
    searchArray.push(
      { userId: mongoose.Types.ObjectId(req.params.searchKeyword) },
      {
        "productsDetails._id": mongoose.Types.ObjectId(
          req.params.searchKeyword
        ),
      }
    );
  }
  let joinStage1 = {
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "userDetails",
      pipeline: [
        {
          $project: {
            _id: 1,
            firstName: 1,
            lastName: 1,
            email: 1,
            mobile: 1,
            photo: 1,
          },
        },
      ],
    },
  };
  let joinStage2 = {
    $lookup: {
      from: "products",
      localField: "allProducts.productId",
      foreignField: "_id",
      as: "productsDetails",
      pipeline: [
        {
          $project: {
            ratings: 0,
          },
        },
      ],
    },
  };
  let result = await deliveredOrderServices(
    req,
    OrderModel,
    searchArray,
    joinStage1,
    joinStage2
  );
  return res.status(200).json(result);
};
exports.getCancelledOrderForUser = async (req, res) => {
  let searchRgx = { $regex: req.params.searchKeyword, $options: "i" };
  let searchArray = [
    { orderId: searchRgx },
    { "paymentIntent.paymentMethod": searchRgx },
    { note: searchRgx },
    { "userDetails.firstName": searchRgx },
    { "userDetails.lastName": searchRgx },
    { "userDetails.email": searchRgx },
    { "userDetails.mobile": searchRgx },

    { "productsDetails.name": searchRgx },
  ];
  if (
    req.params.searchKeyword.length == 12 ||
    req.params.searchKeyword.length == 24
  ) {
    searchArray.push(
      { userId: mongoose.Types.ObjectId(req.params.searchKeyword) },
      {
        "productsDetails._id": mongoose.Types.ObjectId(
          req.params.searchKeyword
        ),
      }
    );
  }
  let joinStage1 = {
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "userDetails",
      pipeline: [
        {
          $project: {
            _id: 1,
            firstName: 1,
            lastName: 1,
            email: 1,
            mobile: 1,
            photo: 1,
          },
        },
      ],
    },
  };
  let joinStage2 = {
    $lookup: {
      from: "products",
      localField: "allProducts.productId",
      foreignField: "_id",
      as: "productsDetails",
      pipeline: [
        {
          $project: {
            ratings: 0,
          },
        },
      ],
    },
  };
  let result = await cancelledOrderServices(
    req,
    OrderModel,
    searchArray,
    joinStage1,
    joinStage2
  );
  return res.status(200).json(result);
};
exports.getReturnedOrderForUser = async (req, res) => {
  let searchRgx = { $regex: req.params.searchKeyword, $options: "i" };
  let searchArray = [
    { orderId: searchRgx },
    { "paymentIntent.paymentMethod": searchRgx },
    { note: searchRgx },
    { "userDetails.firstName": searchRgx },
    { "userDetails.lastName": searchRgx },
    { "userDetails.email": searchRgx },
    { "userDetails.mobile": searchRgx },

    { "productsDetails.name": searchRgx },
  ];
  if (
    req.params.searchKeyword.length == 12 ||
    req.params.searchKeyword.length == 24
  ) {
    searchArray.push(
      { userId: mongoose.Types.ObjectId(req.params.searchKeyword) },
      {
        "productsDetails._id": mongoose.Types.ObjectId(
          req.params.searchKeyword
        ),
      }
    );
  }
  let joinStage1 = {
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "userDetails",
      pipeline: [
        {
          $project: {
            _id: 1,
            firstName: 1,
            lastName: 1,
            email: 1,
            mobile: 1,
            photo: 1,
          },
        },
      ],
    },
  };
  let joinStage2 = {
    $lookup: {
      from: "products",
      localField: "allProducts.productId",
      foreignField: "_id",
      as: "productsDetails",
      pipeline: [
        {
          $project: {
            ratings: 0,
          },
        },
      ],
    },
  };
  let result = await returnedOrderServices(
    req,
    OrderModel,
    searchArray,
    joinStage1,
    joinStage2
  );
  return res.status(200).json(result);
};

exports.getDetailsById = async (req, res) => {
  let joinStage1 = {
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "userDetails",
      pipeline: [
        {
          $project: {
            _id: 1,
            firstName: 1,
            lastName: 1,
            email: 1,
            mobile: 1,
            photo: 1,
          },
        },
      ],
    },
  };
  let joinStage2 = {
    $lookup: {
      from: "products",
      localField: "allProducts.productId",
      foreignField: "_id",
      as: "productsDetails",
      pipeline: [
        {
          $project: {
            ratings: 0,
          },
        },
      ],
    },
  };
  let result = await getDetailsByIdTwoJoinService(
    req,
    OrderModel,
    joinStage1,
    joinStage2
  );

  return res.status(200).json(result);
};

exports.changeOrderStatus = async (req, res) => {
  let result = await updateServiceOrderChangeStatus(req, OrderModel);
  return res.status(200).json(result);
};
