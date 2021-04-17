const { Router } = require("express");
const userController = require("../controllers/userController");

const router = Router();

router.post("/api/users", userController.create_user);

module.exports = router;
