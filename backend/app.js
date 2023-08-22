const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors=require("cors");
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const errorMiddleware = require("./middleware/error");

app.use(express.json());
// express.json() - built-in middleware, parses incoming requests with JSON payloads and is based on body-parser
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

app.use(cors()) // Use this after the variable declaration
// app.use(cors({origin:'http://localhost:3000, credentials:true'})) // this is to make cors error gone 4000 port from frontend
// Routes import
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",order);

// middleware
app.use(errorMiddleware);

// module.exports = app
module.exports = app;