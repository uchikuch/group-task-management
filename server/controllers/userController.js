const { user } = require("../models");

module.exports.create_user = async (req, res) => {
  console.log("creating user", req.body);
  res.status(200).json({ message: "It works" });
};
