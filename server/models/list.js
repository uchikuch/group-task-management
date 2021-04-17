"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class list extends Model {
    static associate(models) {
      // define association here
      list.belongsTo(models.project, {
        through: models.JoinTable,
        foreignKey: "id",
        onDelete: "CASCADE",
      });
      list.hasMany(models.task, {
        through: models.JoinTable,
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
