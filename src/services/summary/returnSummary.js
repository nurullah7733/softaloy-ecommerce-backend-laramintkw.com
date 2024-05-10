let OrderModel = require("../../models/order/orderModel");
const ReturnedSummary = async (Request) => {
  try {
    let data = await OrderModel.aggregate([
      { $match: { orderStatus: "Returned" } },
      {
        $facet: {
          totalReturned: [{ $count: "count" }],
          total: [
            {
              $group: {
                _id: 0,
                totalAmount: { $sum: "$grandTotal" },
              },
            },
          ],
          last30Days: [
            {
              $group: {
                _id: {
                  $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
                },
                totalAmount: { $sum: "$grandTotal" },
              },
            },
            { $sort: { _id: -1 } },
            { $limit: 30 },
          ],
        },
      },
    ]);

    return { status: "success", data };
  } catch (error) {
    return { status: "success", data: error };
  }
};

module.exports = ReturnedSummary;
