"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class project_activity extends Model {
    static associate(models) {
      // define association here
      project_activity.belongsTo(models.project, {
        foreignKey: "id",
        onDelete: "CASCADE",
      });
    }
  }
  project_activity.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      project_id: { type: DataTypes.UUID, allowNull: false },
      info: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "project_activity",
      underscored: true,
    }
  );
  return project_activity;
};
