"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class organisation_member extends Model {
    static associate(models) {
      // define association here
      organisation_member.belongsTo(models.user, {
        foreignKey: "id",
        onDelete: "CASCADE",
      });
      organisation_member.belongsTo(models.organisation, {
        foreignKey: "id",
        onDelete: "CASCADE",
      });
    }
  }
  organisation_member.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      organisation_id: {
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
      modelName: "organisation_member",
      underscored: true,
    }
  );
  return organisation_member;
};
