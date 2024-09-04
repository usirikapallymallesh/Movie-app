const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const dataBaseConnection = async () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connection established");
    })
    .catch((err) => {
      console.log("Error connecting to database", err);
    });
};

module.exports = dataBaseConnection;