const SalesSummaryReportService = async (Request, DataModel) => {
  let fromDate = Request.body.fromDate;
  let toDate = Request.body.toDate;

  try {
    let data = await DataModel.aggregate([
      { $match: { orderStatus: "Delivered" } },
      {
        $match: {
          createdAt: { $gte: new Date(fromDate), $lte: new Date(toDate) },
        },
      },
      {
        $facet: {
          total: [{ $group: { _id: 0, totalAmount: { $sum: "$grandTotal" } } }],
          rows: [
            {
              $lookup: {
                from: "products",
                localField: "allProducts.productId",
                foreignField: "_id",
                as: "productsDetails",
              },
            },
            // { $unwind: "$productName" },
            {
              $lookup: {
                from: "categories",
                localField: "productsDetails.categoryId",
                foreignField: "_id",
                as: "categoryName",
              },
            },
            {
              $lookup: {
                from: "subcategories",
                localField: "productsDetails.subCategoryId",
                foreignField: "_id",
                as: "subCategoryName",
              },
            },
            {
              $lookup: {
                from: "brands",
                localField: "productsDetails.brandId",
                foreignField: "_id",
                as: "brandName",
              },
            },
          ],
        },
      },
    ]);

    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error.toString() };
  }
};

module.exports = SalesSummaryReportService;
