const express = require('express');
const app = express();

const errorMiddleware = require("./middleware/error");

app.use(express.json());
// express.json() - built-in middleware, parses incoming requests with JSON payloads and is based on body-parser

// Routes import
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
app.use("/api/v1",product);
app.use("/api/v1",user);

// middleware
app.use(errorMiddleware);

module.exports = app