require("./utils/loadEnv");
const express = require("express");
const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");


const app = express();

app.set("view engine", "ejs");

app.use("/", indexRouter);
app.use("/", authRouter);

const PORT = process.env.PORT;
app.listen(
  PORT,
  console.log(`Listening...
    check http://localhost:${PORT}`),
);
