"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class organisation_invite extends Model {
    static associate(models) {
      // define association here
      organisation_invite.belongsTo(models.user, {
        through: models.JoinTable,
        foreignKey: "id",
        onDelete: "CASCADE",
      });
      organisation_invite.belongsTo(models.organisation, {
        through: models.JoinTable,
        foreignKey: "id",
        onDelete: "CASCADE",
      });
    }
  }
  organisation_invite.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      organisation_id: { type: DataTypes.UUID, allowNull: false },
      user_id: { type: DataTypes.UUID, allowNull: false },
      status: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "organisation_invite",
      underscored: true,
    }
  );
  return organisation_invite;
};
