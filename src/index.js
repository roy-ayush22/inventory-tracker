require("dotenv").config();
const express = require("express");
const { z } = require("zod");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = require("../routes/route");
const dotenv = require(dotenv);

const app = express();
app.use(express.json());

const PORT = 3001;

app.use("/", router);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
