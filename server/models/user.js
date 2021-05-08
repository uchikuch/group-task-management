"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      // define association here
      user.belongsToMany(models.organisation, {
        through: models.organisation_member,
        foreignKey: "user_id",
        onDelete: "CASCADE",
      });
      user.hasMany(models.organisation_invite, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
      });
      user.belongsToMany(models.project, {
        through: models.project_member,
        foreignKey: "user_id",
        onDelete: "CASCADE",
      });
      user.belongsToMany(models.task, {
        through: models.task_member,
        foreignKey: "user_id",
        onDelete: "CASCADE",
      });
      user.hasMany(models.task_comment, {
        foreignKey: "user_id",
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
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
    },
    {
      sequelize,
      modelName: "user",
      underscored: true,
    }
  );
  return user;
};
