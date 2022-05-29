const nodemailer = require("nodemailer");

const sendEmail = (options) => {
  const transporter = nodemailer.createTransport({
    service: 'SendGrid',
    auth: {
      user: 'apikey',
      pass: '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',
    },
  });

  const mailOptions = {
    from:process.env.Email_From,
    to: options.to,
    subject: options.subject,
    html: options.text,
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

module.exports = sendEmail;