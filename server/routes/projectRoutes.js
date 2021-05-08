const { Router } = require("express");
const projectController = require("../controllers/projectController");
const project_activity = require("../models/project_activity");

const router = Router();

router.post("/api/organisations/projects", projectController.create_project);
router.get("/api/projects/:id", projectController.fetch_project);
router.post("/api/projects/members", projectController.add_project_member);

module.exports = router;
