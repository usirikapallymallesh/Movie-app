// console.log('server connection');
// step 1: create a server instance
const dotenv = require("dotenv").config();
const express = require("express");
const dataBaseConnection = require("./utils/Database");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/UserRoute.js");
const cors = require("cors");

dataBaseConnection();

// step 2: setup middleware
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true, // enable set cookies over http and https
};

app.use(cors(corsOptions));

// api
app.use("/api/v1/user", userRoute);
//http://localhost:8080/api/v1/user/reigister

// step 3: listen on port
app.listen(process.env.PORT, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});
