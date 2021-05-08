"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class project extends Model {
    static associate(models) {
      // define association here
      project.belongsToMany(models.user, {
        through: models.project_member,
        foreignKey: "project_id",
        onDelete: "CASCADE",
      });
      project.belongsTo(models.organisation, {
        foreignKey: "id",
        onDelete: "CASCADE",
      });
      project.hasMany(models.list, {
        foreignKey: "project_id",
        onDelete: "CASCADE",
      });
      project.hasMany(models.project_activity, {
        foreignKey: "project_id",
        onDelete: "CASCADE",
      });
      project.hasMany(models.task, {
        foreignKey: "project_id",
        onDelete: "CASCADE",
      });
    }
  }
  project.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      organisation_id: { type: DataTypes.UUID, allowNull: false },
      name: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING },
      due_date: { type: DataTypes.DATE },
    },
    {
      sequelize,
      modelName: "project",
      underscored: true,
    }
  );
  return project;
};
