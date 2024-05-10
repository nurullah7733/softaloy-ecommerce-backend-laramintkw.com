const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

const SendEmailUtilityForContactUs = async (name, email, phone, message) => {
  var transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: process.env.GMAIL,
        pass: process.env.GMAIL_PASSWORD,
      },
    })
  );

  var mailOptions = {
    from: "egolap.com <egolap2@gmail.com>",
    to: ["egolap2@gmail.com"],
    subject: "Contact Us",
    html: `<h1>Name: ${name}</h1> <h2>Email: ${email}</h2> <h3>phone: ${phone}</h3> <h4>message: ${message}</h4>`,
  };

  return await transporter.sendMail(mailOptions);
};

module.exports = SendEmailUtilityForContactUs;
