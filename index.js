require("./utils/loadEnv");
const express = require("express");
const indexRouter = require("./routes/index");

const app = express();

app.set("view engine", "ejs");

app.use("/", indexRouter);

const PORT = process.env.PORT;
app.listen(
  PORT,
  console.log(`Listening...
    check http://localhost:${PORT}`),
);
