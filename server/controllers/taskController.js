const {
  project,
  list,
  project_member,
  task_member,
  task_comment,
  task,
  user,
  project_activity,
} = require("../models");
const constants = require("../config/constants");

module.exports.create_task = async (req, res) => {
  console.log("create task", req.body);

  const { project_id, name, list_id, description, due_date } = req.body;

  try {
    const new_task = await task.create({
      project_id,
      name,
      list_id,
      description,
      due_date,
    });
    // add project activity
    const activity = await project_activity.create({
      project_id,
      info: constants.PROJECT_ACTIVITY.ADD_TASK(new_task.name),
    });
    return res.status(200).json(new_task);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

module.exports.add_task_member = async (req, res) => {
  console.log("adding task member", req.body);

  const { task_id, user_id } = req.body;

  try {
    const membership = await task_member.create({
      task_id,
      user_id,
    });
    // add project activity
    const project_user = await user.findByPk(user_id);
    current_task = await task.findByPk(task_id);
    const activity = await project_activity.create({
      project_id: current_task.project_id,
      info: constants.PROJECT_ACTIVITY.ASSIGN_TASK(
        project_user.first_name,
        current_task.name
      ),
    });
    return res.status(200).json({ membership, activity });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

module.exports.add_task_comment = async (req, res) => {
  console.log("adding task comment", req.body);

  const { task_id, user_id, comment_text } = req.body;

  try {
    const comment = await task_comment.create({
      task_id,
      user_id,
      comment_text,
    });
    return res.status(200).json(comment);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

module.exports.fetch_task = async (req, res) => {
  console.log("fetching task", req.params.id);

  try {
    const current_task = await task.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: user,
        },
        {
          model: task_comment,
        },
      ],
    });
    return res.status(200).json(current_task);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
