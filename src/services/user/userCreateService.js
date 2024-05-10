const bcrypt = require("bcrypt");
const createUserService = async (Request, DataModel) => {
  let reqBody = Request.body;
  let password = Request.body.password;
  Request.body.photo = [
    {
      public_id: "default_avatar",
      secure_url:
        "https://res.cloudinary.com/dwcjrquex/image/upload/v1709617274/profile/avatar_mwtugu.jpg",
    },
  ];

  try {
    const salt = await bcrypt.genSaltSync(10);
    password = await bcrypt.hash(password, salt);
    reqBody.password = password;
    let data = await DataModel.create(reqBody);
    return { status: "success", data };
  } catch (error) {
    return { status: "fail", data: error };
  }
};

module.exports = createUserService;
