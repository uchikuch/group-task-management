"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class task extends Model {
    static associate(models) {
      // define association here
      task.belongsTo(models.project, {
        through: models.JoinTable,
        foreignKey: "id",
        onDelete: "CASCADE",
      });
      task.belongsTo(models.list, {
        through: models.JoinTable,
        foreignKey: "id",
        onDelete: "CASCADE",
      });
      task.hasMany(models.task_member, {
        through: models.JoinTable,
        foreignKey: "id",
        onDelete: "CASCADE",
      });
      task.hasMany(models.task_comment, {
        through: models.JoinTable,
        foreignKey: "id",
        onDelete: "CASCADE",
      });
    }
  }
  task.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      project_id: { type: DataTypes.UUID, allowNull: false },
      list_id: { type: DataTypes.UUID, allowNull: false },
      name: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING },
      status: { type: DataTypes.STRING },
      due_date: { type: DataTypes.DATE },
    },
    {
      sequelize,
      modelName: "task",
      underscored: true,
    }
  );
  return task;
};
