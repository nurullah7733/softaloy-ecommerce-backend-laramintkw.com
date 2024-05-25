const bcrypt = require("bcrypt");
const generateRandomPassword = require("../../utils/generateRandomPassword");

const createUserServiceWhenOrder = async (createUserData, DataModel) => {
  let createAllUserData = createUserData;

  let password = generateRandomPassword();

  createAllUserData.photo = [
    {
      public_id: "default_avatar",
      secure_url:
        "https://res.cloudinary.com/dwcjrquex/image/upload/v1709617274/profile/avatar_mwtugu.jpg",
    },
  ];

  try {
    const salt = await bcrypt.genSaltSync(10);
    password = await bcrypt.hash(password, salt);
    createAllUserData.password = password;
    let data = await DataModel.create(createAllUserData);
    return { status: "success", data };
  } catch (error) {
    return { status: "fail", data: error };
  }
};

module.exports = createUserServiceWhenOrder;
