const listThreeJoinServiceSortByCreateAt = async (
  Request,
  DataModel,
  searchArray,
  joinStage1,
  joinStage2,
  joinStage3
) => {
  let inStock = Request.query.inStock?.toString();

  let pageNo = Number(Request.params.pageNo);
  let perPage = Number(Request.params.perPage);
  let searchKeyword = Request.params.searchKeyword;
  let skipRow = (pageNo - 1) * perPage;
  let email = Request.headers.email;

  // start custom array push indexing
  Array.prototype.insert = function (index, ...items) {
    this.splice(index, 0, ...items);
  };
  // end custom array push indexing

  let queryPipeline = [
    { $match: { $expr: { $ne: ["$events", []] } } },
    joinStage1,
    joinStage2,
    joinStage3,
  ];

  if (searchKeyword !== "0") {
    queryPipeline.push({ $match: { $or: searchArray } });
  }

  if (inStock == "true") {
    queryPipeline.push({ $match: { quantity: { $gte: 1 } } });
  }
  if (inStock == "false") {
    queryPipeline.push({ $match: { quantity: 0 } });
  }
  if (inStock == "5") {
    queryPipeline.push({ $match: { quantity: { $gte: 1, $lte: 5 } } });
  }
  if (inStock == "10") {
    queryPipeline.push({ $match: { quantity: { $gte: 1, $lte: 10 } } });
  }

  // Sort by createdAt
  queryPipeline.push({ $sort: { createdAt: -1 } });

  // Skip and Limit for pagination
  queryPipeline.push({ $skip: skipRow }, { $limit: perPage });

  try {
    // Get total count separately
    const totalQuery = {};
    if (searchKeyword !== "0") {
      totalQuery.$or = searchArray;
    }
    if (inStock == "true") {
      totalQuery.quantity = { $gte: 1 };
    }
    if (inStock == "false") {
      totalQuery.quantity = 0;
    }
    if (inStock == "5") {
      totalQuery.quantity = { $gte: 1, $lte: 5 };
    }
    if (inStock == "10") {
      totalQuery.quantity = { $gte: 1, $lte: 10 };
    }

    const total = await DataModel.countDocuments(totalQuery);

    // Perform the aggregation
    const rows = await DataModel.aggregate(queryPipeline).allowDiskUse();

    return { status: "success", data: { total, rows } };
  } catch (error) {
    return { status: "fail", data: error.toString() };
  }
};

module.exports = listThreeJoinServiceSortByCreateAt;
