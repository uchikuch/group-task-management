const {
  project,
  list,
  project_member,
  user,
  task,
  project_activity,
} = require("../models");
const constants = require("../config/constants");

module.exports.create_project = async (req, res) => {
  console.log("create project", req.body);

  const { organisation_id, name, description, due_date } = req.body;

  try {
    const new_project = await project.create({
      organisation_id,
      name,
      description,
      due_date,
    });
    // add three default lists
    list.bulkCreate([
      {
        project_id: new_project.id,
        name: constants.DEFAULT_LIST.TODO,
      },
      {
        project_id: new_project.id,
        name: constants.DEFAULT_LIST.DOING,
      },
      {
        project_id: new_project.id,
        name: constants.DEFAULT_LIST.DONE,
      },
    ]);
    return res.status(200).json(new_project);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

module.exports.fetch_project = async (req, res) => {
  console.log("fetching project", req.params.id);

  try {
    const current_project = await project.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: user,
        },
        {
          model: list,
        },
        {
          model: task,
        },
      ],
    });
    return res.status(200).json(current_project);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

module.exports.add_project_member = async (req, res) => {
  console.log("add_project_member", req.body);

  try {
    const { project_id, user_id } = req.body;

    const membership = await project_member.create({
      project_id,
      user_id,
    });
    // add project activity
    const project_user = await user.findByPk(user_id);
    const activity = await project_activity.create({
      project_id,
      info: constants.PROJECT_ACTIVITY.ADD_MEMBER(project_user.first_name),
    });
    return res.status(200).json({ membership, activity });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
