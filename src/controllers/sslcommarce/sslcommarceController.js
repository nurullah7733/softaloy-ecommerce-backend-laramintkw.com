const SSLCommerzPayment = require("sslcommerz-lts");
const mongoose = require("mongoose");
const uniqid = require("uniqid");
const globals = require("node-global-storage"); // Commonjs
const orderModel = require("../../models/order/orderModel");
const productModel = require("../../models/product/productModel");

const store_id = process.env.SSLCOMMERCE_STORE_ID;
const store_passwd = process.env.SSLCOMMERCE_STORE_PASSWORD;
const is_live = false; //true for live, false for sandbox

// initial payment
exports.initPayment = async (req, res) => {
  let tran_id = uniqid.process();
  let reqBody = req.body;
  globals.unset("orderAllInformation");

  const data = {
    total_amount: parseInt(reqBody.grandTotal),
    currency: "BDT",
    tran_id: tran_id, // use unique tran_id for each api call
    success_url: "http://localhost:4000/payment-success",
    fail_url: "http://localhost:4000/payment-fail",
    cancel_url: "http://localhost:4000/payment-cancel",
    ipn_url: "http://localhost:4000/payment-ipn",
    shipping_method: "Courier",

    product_name: "Multiple products",
    product_category: "Multiple electronic",
    product_profile: "general",

    cus_name: "Customer Name",
    cus_email: "customer@example.com",
    cus_add1: "Dhaka",
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: "01711111111",
    cus_fax: "01711111111",
    ship_name: "Customer Name",
    ship_add1: "Dhaka",
    ship_add2: "Dhaka",
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: 1000,
    ship_country: "Bangladesh",
  };
  try {
    globals.set("orderAllInformation", JSON.stringify(reqBody));
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    let result = await sslcz.init(data);

    if (result?.GatewayPageURL) {
      await orderModel.create({
        userId: reqBody.userId,
        tran_id: tran_id,
        paymentStatus: "init",
      });

      return res
        .status(200)
        .json({ status: "success", data: result?.GatewayPageURL });
    } else {
      return res
        .status(400)
        .json({ status: "fail", data: "Payment session fail" });
    }
  } catch (error) {
    return res.status(400).json({ status: "fail", data: error.toString() });
  }
};

// payment successed
exports.successPaymnet = async (req, res) => {
  const session = await mongoose.startSession();
  let reqBody = req.body;
  let ordersAllInfo = JSON.parse(globals.get("orderAllInformation"));

  try {
    await session.startTransaction();
    await orderModel.updateOne(
      { tran_id: reqBody.tran_id },
      {
        userId: ordersAllInfo?.userId,
        paymentStatus: "success",
        allProducts: ordersAllInfo?.allProducts,
        "paymentIntent.paymentId": reqBody.tran_id,
        "paymentIntent.paymentMethod": reqBody.card_issuer,
        "paymentIntent.amount": ordersAllInfo?.grandTotal,
        voucherDiscount: ordersAllInfo?.voucherDiscount,
        subTotal: ordersAllInfo?.grandTotal - ordersAllInfo?.shippingCost,
        shippingCost: ordersAllInfo?.shippingCost,
        grandTotal: ordersAllInfo?.grandTotal,

        shippingAddress: {
          name: ordersAllInfo?.shippingAddress?.name,
          email: ordersAllInfo?.shippingAddress?.email,
          mobile: ordersAllInfo?.shippingAddress?.mobile,
          alternativeMobile: ordersAllInfo?.shippingAddress?.alternativeMobile,
          thana: ordersAllInfo?.shippingAddress?.thana,
          city: ordersAllInfo?.shippingAddress?.city,
          country: ordersAllInfo?.shippingAddress?.country,
          zipCode: ordersAllInfo?.shippingAddress?.zipCode,
          address: ordersAllInfo?.shippingAddress?.address,
        },
      },
      { session }
    );

    for (const el of ordersAllInfo?.allProducts) {
      await productModel.updateOne(
        { _id: el._id },
        {
          $inc: {
            quantity: -Number(el?.customerChoiceProductQuantity),
            sold: Number(el?.customerChoiceProductQuantity),
          },
        },
        { session }
      );
    }

    await session.commitTransaction();
    session.endSession();

    return res.redirect("http://localhost:3000/payment/success");
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return res.status(400).json({ status: "fail", data: error.toString() });
  }
};
// payment cancelled
exports.cancelPaymnet = async (req, res) => {
  let reqBody = req.body;
  let ordersAllInfo = JSON.parse(globals.get("orderAllInformation"));

  await orderModel.updateOne(
    { tran_id: reqBody.tran_id },
    {
      userId: ordersAllInfo?.userId,
      paymentStatus: "Cancelled",
      orderStatus: "Cancelled",
      allProducts: ordersAllInfo?.allProducts,
      "paymentIntent.paymentId": reqBody.tran_id,
      "paymentIntent.paymentMethod": "",
      "paymentIntent.amount": ordersAllInfo?.grandTotal,
      voucherDiscount: ordersAllInfo?.voucherDiscount,
      subTotal: ordersAllInfo?.grandTotal - ordersAllInfo?.shippingCost,
      shippingCost: ordersAllInfo?.shippingCost,
      grandTotal: ordersAllInfo?.grandTotal,

      shippingAddress: {
        name: ordersAllInfo?.shippingAddress?.name,
        email: ordersAllInfo?.shippingAddress?.email,
        mobile: ordersAllInfo?.shippingAddress?.mobile,
        alternativeMobile: ordersAllInfo?.shippingAddress?.alternativeMobile,
        thana: ordersAllInfo?.shippingAddress?.thana,
        city: ordersAllInfo?.shippingAddress?.city,
        country: ordersAllInfo?.shippingAddress?.country,
        zipCode: ordersAllInfo?.shippingAddress?.zipCode,
        address: ordersAllInfo?.shippingAddress?.address,
      },
    }
  );
  return res.redirect("http://localhost:3000/payment/cancel");
};
// payment fail
exports.failPaymnet = async (req, res) => {
  let reqBody = req.body;
  let ordersAllInfo = JSON.parse(globals.get("orderAllInformation"));

  await orderModel.updateOne(
    { tran_id: reqBody.tran_id },
    {
      userId: ordersAllInfo?.userId,
      paymentStatus: "Failed",
      orderStatus: "Failed",
      allProducts: ordersAllInfo?.allProducts,
      "paymentIntent.paymentId": reqBody.tran_id,
      "paymentIntent.paymentMethod": "",
      "paymentIntent.amount": ordersAllInfo?.grandTotal,
      voucherDiscount: ordersAllInfo?.voucherDiscount,
      subTotal: ordersAllInfo?.grandTotal - ordersAllInfo?.shippingCost,
      shippingCost: ordersAllInfo?.shippingCost,
      grandTotal: ordersAllInfo?.grandTotal,

      shippingAddress: {
        name: ordersAllInfo?.shippingAddress?.name,
        email: ordersAllInfo?.shippingAddress?.email,
        mobile: ordersAllInfo?.shippingAddress?.mobile,
        alternativeMobile: ordersAllInfo?.shippingAddress?.alternativeMobile,
        thana: ordersAllInfo?.shippingAddress?.thana,
        city: ordersAllInfo?.shippingAddress?.city,
        country: ordersAllInfo?.shippingAddress?.country,
        zipCode: ordersAllInfo?.shippingAddress?.zipCode,
        address: ordersAllInfo?.shippingAddress?.address,
      },
    }
  );
  return res.redirect("http://localhost:3000/payment/fail");
};
// payment ipn
exports.ipnPaymnet = async (req, res) => {
  let reqBody = req.body;
  let ordersAllInfo = JSON.parse(globals.get("orderAllInformation"));

  await orderModel.updateOne(
    { tran_id: reqBody.tran_id },
    {
      userId: ordersAllInfo?.userId,
      paymentStatus: "Cancelled",
      orderStatus: "Failed",
      allProducts: ordersAllInfo?.allProducts,
      "paymentIntent.paymentId": reqBody.tran_id,
      "paymentIntent.paymentMethod": "",
      "paymentIntent.amount": ordersAllInfo?.grandTotal,
      voucherDiscount: ordersAllInfo?.voucherDiscount,
      subTotal: ordersAllInfo?.grandTotal - ordersAllInfo?.shippingCost,
      shippingCost: ordersAllInfo?.shippingCost,
      grandTotal: ordersAllInfo?.grandTotal,

      shippingAddress: {
        name: ordersAllInfo?.shippingAddress?.name,
        email: ordersAllInfo?.shippingAddress?.email,
        mobile: ordersAllInfo?.shippingAddress?.mobile,
        alternativeMobile: ordersAllInfo?.shippingAddress?.alternativeMobile,
        thana: ordersAllInfo?.shippingAddress?.thana,
        city: ordersAllInfo?.shippingAddress?.city,
        country: ordersAllInfo?.shippingAddress?.country,
        zipCode: ordersAllInfo?.shippingAddress?.zipCode,
        address: ordersAllInfo?.shippingAddress?.address,
      },
    }
  );
  return res.redirect("http://localhost:3000/payment/fail");
};
