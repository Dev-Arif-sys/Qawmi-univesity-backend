
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();
const sgMail = require("@sendgrid/mail");
const API_KEY = process.env.EMAIL_API_KEY;
sgMail.setApiKey(API_KEY);

const sendEmail = async (req, res) => {
  try {
    const message = {
      to: req.body.to, // jodi multiple patate cai tahole array er vitore dite hbe
      from: {
        name: "Qawmi University",
        email: "care@qawmiuniversity.com",
      },
      subject: "Hello from Qawmi University",
      text: req.body.text,
      html: `<p>${req.body.text}</p>`,
    };
    const response = await sgMail.send(message);

    console.log(response, "mail has been sent");
    res.status(200).json({
        success: true,
        message: "mail has been sent",
      });
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {sendEmail};
