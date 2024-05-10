const RelatedProductsSearchSercice = async (
  Request,
  DataModel,
  joinStage1,
  joinStage2,
  joinStage3
) => {
  let subCategory = Request.params.subCategory;
  try {
    let data;
    let namesToSearch = [];
    namesToSearch.push(subCategory);
    const regexPatterns = namesToSearch.map((name) => new RegExp(name, "i"));
    data = await DataModel.aggregate([
      joinStage1,
      joinStage2,
      joinStage3,
      {
        $project: {
          description: 0,
        },
      },
      {
        $match: {
          $or: [
            {
              "subCategory.name": {
                $in: namesToSearch,
              },
            },
            {
              "subCategory.name": {
                $in: regexPatterns,
              },
            },
          ],
        },
      },
      {
        $facet: {
          total: [{ $count: "count" }],
          rows: [{ $skip: 0 }, { $limit: 10 }],
        },
      },
    ]);

    return { status: "success", data };
  } catch (error) {
    return { status: "fail", data: error.toString() };
  }
};

module.exports = RelatedProductsSearchSercice;
