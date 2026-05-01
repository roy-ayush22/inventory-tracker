require("dotenv").config();
const express = require("express");
const router = require("../routes/route");
const dbConnection = require("../db/db");

const app = express();
app.use(express.json());
dbConnection();
const PORT = process.env.PORT;

app.use("/auth", require("../routes/auth"));
app.use("/", router);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
