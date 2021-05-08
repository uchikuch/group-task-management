const {
  organisation,
  organisation_member,
  organisation_invite,
} = require("../models");
const constants = require("../config/constants");

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

module.exports.create_organisation_invite = async (req, res) => {
  console.log("creating invite", req.body);

  const { organisation_id, user_id, status } = req.body;

  try {
    const invitation = await organisation_invite.create({
      organisation_id,
      user_id,
      status,
    });
    return res.status(200).json(invitation);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

module.exports.add_organisation_member = async (req, res) => {
  console.log("responding to invite", req.body);

  const { organisation_id, user_id, invitation_id, status } = req.body;

  try {
    // find IV by PK
    const invitation = await organisation_invite.findByPk(invitation_id);
    if (!invitation) {
      console.log("No IV found");
      return res.status(400).json(req.body);
    }
    // Respond to IV
    // if status is accepted
    if (status === constants.INVITE_STATUS.ACCEPTED) {
      // add member to org
      const member = await organisation_member.create({
        organisation_id,
        user_id,
      });
      // change the status of the invitation
      invitation.status = status;
      await invitation.save();
      return res.status(200).json(invitation);
    }

    // if staus is rejected
    if (status === constants.INVITE_STATUS.REJECTED) {
      await invitation.destroy();
      return res.status(200).json(req.body);
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
