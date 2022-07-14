const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose
    .connect(
      "mongodb+srv://qawmi:gUweWqnFYVX4BX1P@cluster0.h3eis.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => console.log("connected successfully"))
    .catch((error) => console.log(error));
};

module.exports = connectDB;
