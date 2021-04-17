const express = require("express");
const logger = require("morgan");

const app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const userRoutes = require("./server/routes/userRoutes");
const organisationRoutes = require("./server/routes/organisationRoutes");

app.get("*", (req, res) =>
  res.status(200).send({
    message: "Welcome to the beginning of nothingness.",
  })
);

app.use(userRoutes);
app.use(organisationRoutes);

module.exports = app;
