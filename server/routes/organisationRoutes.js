const { Router } = require("express");
const organisationController = require("../controllers/organisationController");

const router = Router();

router.post(
  "/api/create_organisation",
  organisationController.create_organisation
);
router.post(
  "/api/create_org_invite",
  organisationController.create_organisation_invite
);
router.post(
  "/api/respond_org_invite",
  organisationController.respond_to_organisation_invite
);

module.exports = router;
