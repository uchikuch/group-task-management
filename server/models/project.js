"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class project extends Model {
    static associate(models) {
      // define association here
      project.belongsTo(models.user, {
        through: models.JoinTable,
        foreignKey: "id",
        onDelete: "CASCADE",
      });
      project.hasMany(models.organisation_invite, {
        through: models.JoinTable,
        foreignKey: "id",
        onDelete: "CASCADE",
      });
      project.hasMany(models.organisation_member, {
        through: models.JoinTable,
        foreignKey: "id",
        onDelete: "CASCADE",
      });
      project.hasMany(models.project_member, {
        through: models.JoinTable,
        foreignKey: "id",
        onDelete: "CASCADE",
      });
      project.hasMany(models.project, {
        through: models.JoinTable,
        foreignKey: "id",
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
    },
    {
      sequelize,
      modelName: "project",
      underscored: true,
    }
  );
  return project;
};
