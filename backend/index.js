const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");

connectDB();

const port = process.env.PORT || 4002;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/books", require("./routes/bookRoutes"));

app.listen(port, () => console.log(`Server connected on ${port}`.bgBlue));
