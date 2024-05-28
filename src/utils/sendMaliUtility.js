var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");

const SendEmailUtility = async (EmailTo, EmailText) => {
  var transporter = nodemailer.createTransport(
    smtpTransport({
      host: "mail.laramintkw.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL,
        pass: process.env.GMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
      debug: true, // Enable debugging
    })
  );

  var mailOptions = {
    from: "laramintkw.com <info@laramintkw.com>",
    to: [EmailTo],
    subject: "Password Reset",
    text: EmailText,
  };

  return await transporter.sendMail(mailOptions);
};

module.exports = SendEmailUtility;
