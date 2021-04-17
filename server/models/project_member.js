"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class project_member extends Model {
    static associate(models) {
      // define association here
      project_member.belongsTo(models.user, {
        through: models.JoinTable,
        foreignKey: "id",
        onDelete: "CASCADE",
      });
      project_member.belongsTo(models.project, {
        through: models.JoinTable,
        foreignKey: "id",
        onDelete: "CASCADE",
      });
    }
  }
  project_member.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      project_id: { type: DataTypes.UUID, allowNull: false },
      user_id: { type: DataTypes.UUID, allowNull: false },
    },
    {
      sequelize,
      modelName: "project_member",
      underscored: true,
    }
  );
  return project_member;
};
