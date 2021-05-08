const { Router } = require("express");
const taskController = require("../controllers/taskController");

const router = Router();

router.post("/api/projects/tasks", taskController.create_task);
router.post("/api/tasks/members", taskController.add_task_member);
router.post("/api/tasks/comments", taskController.add_task_comment);
router.get("/api/tasks/:id", taskController.fetch_task);

module.exports = router;
