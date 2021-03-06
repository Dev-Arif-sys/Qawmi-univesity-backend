const dotenv = require("dotenv");
dotenv.config();
const sgMail = require("@sendgrid/mail");
const API_KEY = process.env.EMAIL_API_KEY;
sgMail.setApiKey(API_KEY);

const sendEmail = async (req, res) => {
  try {
    const message = {
      to: "bugsmashersbd@gmail.com", // jodi multiple patate cai tahole array er vitore dite hbe
      from: {
        name: "Qawmi University",
        email: "care@qawmiuniversity.com",
      },
      subject: "Hello from Qawmi University",
      text: "Its jain",
      html: "<h1>Its jain</h1>",
    };
    const response = await sgMail.send(message);
    console.log(response, "mail has been sent");
  } catch (error) {
    console.error(error.message);
  }
};

sendEmail();
