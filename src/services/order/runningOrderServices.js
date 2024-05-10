const mongoose = require("mongoose");

const runningOrderServices = async (
  Request,
  DataModel,
  searchArray,
  joinStage1,
  joinStage2
) => {
  let pageNo = Number(Request.params.pageNo);
  let perPage = Number(Request.params.perPage);
  let searchKeyword = Request.params.searchKeyword;
  let skipRow = (pageNo - 1) * perPage;
  let userId = Request.headers.userId;

  try {
    let data;
    if (searchKeyword !== "0") {
      data = await DataModel.aggregate([
        // { $match: { $expr: { $ne: ["$events", []] } } },
        {
          $match: { userId: mongoose.Types.ObjectId(userId) },
        },
        {
          $match: {
            orderStatus: { $not: { $eq: "Delivered" } },
          },
        },
        {
          $match: {
            orderStatus: { $not: { $eq: "Cancelled" } },
          },
        },
        {
          $match: {
            orderStatus: { $not: { $eq: "Returned" } },
          },
        },
        joinStage1,
        joinStage2,
        { $match: { $or: searchArray } },
        {
          $facet: {
            total: [{ $count: "count" }],
            rows: [{ $skip: skipRow }, { $limit: perPage }],
          },
        },
      ]);
    } else {
      data = await DataModel.aggregate([
        {
          $match: { userId: mongoose.Types.ObjectId(userId) },
        },
        {
          $match: {
            orderStatus: { $not: { $eq: "Delivered" } },
          },
        },
        {
          $match: {
            orderStatus: { $not: { $eq: "Cancelled" } },
          },
        },
        {
          $match: {
            orderStatus: { $not: { $eq: "Returned" } },
          },
        },
        joinStage1,
        joinStage2,
        {
          $facet: {
            total: [{ $count: "count" }],
            rows: [{ $skip: skipRow }, { $limit: perPage }],
          },
        },
      ]);
    }
    return { status: "success", data };
  } catch (error) {
    return { status: "fail", data: error.toString() };
  }
};

module.exports = runningOrderServices;
