const { Router } = require("express");
const organisationController = require("../controllers/organisationController");

const router = Router();

router.post(
  "/api/create_organisation",
  organisationController.create_organisation
);

module.exports = router;
