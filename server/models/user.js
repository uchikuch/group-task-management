"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      // define association here
      user.hasMany(models.organisation, {
        through: models.JoinTable,
        foreignKey: "id",
        onDelete: "CASCADE",
      });
      user.hasMany(models.organisation_invite, {
        through: models.JoinTable,
        foreignKey: "id",
        onDelete: "CASCADE",
      });
      user.hasMany(models.organisation_member, {
        through: models.JoinTable,
        foreignKey: "id",
        onDelete: "CASCADE",
      });
      user.hasMany(models.project_member, {
        through: models.JoinTable,
        foreignKey: "id",
        onDelete: "CASCADE",
      });
      user.hasMany(models.task_member, {
        through: models.JoinTable,
        foreignKey: "id",
        onDelete: "CASCADE",
      });
      user.hasMany(models.task_comment, {
        through: models.JoinTable,
        foreignKey: "id",
      });
    }
  }
  user.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      first_name: { type: DataTypes.STRING, allowNull: false },
      last_name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "user",
      underscored: true,
    }
  );
  return user;
};
