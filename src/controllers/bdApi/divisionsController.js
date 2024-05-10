const axios = require("axios");
exports.getDivisions = async (req, res) => {
  const options = {
    method: "GET",
    url: "https://bdapis.com/api/v1.1/divisions",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.request(options);
    return res.status(200).json({
      status: "success",
      data: response.data,
    });
  } catch (error) {
    console.error(error);
  }
};

exports.getDistrictsByDivisions = async (req, res) => {
  let district = req.params.district;
  const options = {
    method: "GET",
    url: `https://bdapis.com/api/v1.1/division/${district}`,
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.request(options);
    return res.status(200).json({
      status: "success",
      data: response.data,
    });
  } catch (error) {
    console.error(error);
  }
};
