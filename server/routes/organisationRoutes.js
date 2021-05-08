const { Router } = require("express");
const organisationController = require("../controllers/organisationController");

const router = Router();

router.post("/api/organisations", organisationController.create_organisation);
router.post(
  "/api/organisations/invites",
  organisationController.create_organisation_invite
);
router.post(
  "/api/organisations/members",
  organisationController.add_organisation_member
);

module.exports = router;
