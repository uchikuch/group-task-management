"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class project_member extends Model {
    static associate(models) {
      // define association here
      project_member.belongsTo(models.user, {
        foreignKey: "id",
        onDelete: "CASCADE",
      });
      project_member.belongsTo(models.project, {
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
      project_id: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: "compositeIndex",
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: "compositeIndex",
      },
    },
    {
      sequelize,
      modelName: "project_member",
      underscored: true,
    }
  );
  return project_member;
};
