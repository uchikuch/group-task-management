"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class task_member extends Model {
    static associate(models) {
      // define association here
      task_member.belongsTo(models.user, {
        foreignKey: "id",
        onDelete: "CASCADE",
      });
      task_member.belongsTo(models.project, {
        foreignKey: "id",
        onDelete: "CASCADE",
      });
    }
  }
  task_member.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      task_id: {
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
      modelName: "task_member",
      underscored: true,
    }
  );
  return task_member;
};
