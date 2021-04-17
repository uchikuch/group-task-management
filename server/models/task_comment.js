"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class task_comment extends Model {
    static associate(models) {
      // define association here
      task_comment.belongsTo(models.user, {
        through: models.JoinTable,
        foreignKey: "id",
        onDelete: "CASCADE",
      });
      task_comment.belongsTo(models.task, {
        through: models.JoinTable,
        foreignKey: "id",
        onDelete: "CASCADE",
      });
    }
  }
  task_comment.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      task_id: { type: DataTypes.UUID, allowNull: false },
      user_id: { type: DataTypes.UUID, allowNull: false },
      comment_text: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "task_comment",
      underscored: true,
    }
  );
  return task_comment;
};
