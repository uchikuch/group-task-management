const { organisation, organisation_member } = require("../models");

module.exports.create_organisation = async (req, res) => {
  console.log("creating org", req.body);

  const { owner_id, name, type, description } = req.body;

  try {
    // create new org record
    const new_org = await organisation.create({
      owner_id,
      name,
      type,
      description,
    });
    // create owner record as new member of org
    const member = await organisation_member.create({
      organisation_id: new_org.id,
      user_id: new_org.owner_id,
    });
    return res.status(200).json({ new_org, member });
  } catch (err) {
    console.log(err);
    res.satus(400).json(err);
  }
  return res.status(200).json(req.body);
};
