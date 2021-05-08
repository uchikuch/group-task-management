"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class list extends Model {
    static associate(models) {
      // define association here
      list.belongsTo(models.project, {
        foreignKey: "id",
        onDelete: "CASCADE",
      });
      list.hasMany(models.task, {
        foreignKey: "id",
        onDelete: "CASCADE",
      });
    }
  }
  list.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      project_id: { type: DataTypes.UUID, allowNull: false },
      name: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "list",
      underscored: true,
    }
  );
  return list;
};
