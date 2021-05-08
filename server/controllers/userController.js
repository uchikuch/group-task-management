const {
  user,
  organisation,
  task,
  organisation_invite,
  project,
} = require("../models");

module.exports.create_user = async (req, res) => {
  console.log("creating user", req.body);

  const { first_name, last_name, email } = req.body;

  try {
    const newUser = await user.create({ first_name, last_name, email });
    return res.status(200).json(newUser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

module.exports.fetch_user = async (req, res) => {
  console.log("fetching user", req.params.id);

  try {
    const newUser = await user.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: organisation,
        },
        {
          model: organisation_invite,
        },
        {
          model: project,
        },
        {
          model: task,
        },
      ],
    });
    return res.status(200).json(newUser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
