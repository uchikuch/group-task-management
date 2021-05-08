const express = require("express");
const logger = require("morgan");

const app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const userRoutes = require("./server/routes/userRoutes");
const organisationRoutes = require("./server/routes/organisationRoutes");
const projectRoutes = require("./server/routes/projectRoutes");
const taskRoutes = require("./server/routes/taskRoutes");

app.use(userRoutes);
app.use(organisationRoutes);
app.use(projectRoutes);
app.use(taskRoutes);

module.exports = app;
