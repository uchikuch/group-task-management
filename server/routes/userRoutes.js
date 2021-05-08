const { Router } = require("express");
const userController = require("../controllers/userController");

const router = Router();

router.post("/api/users", userController.create_user);
router.get("/api/users/:id", userController.fetch_user);

module.exports = router;
