"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class organisation extends Model {
    static associate(models) {
      // define association here
      organisation.belongsToMany(models.user, {
        through: models.organisation_member,
        foreignKey: "organisation_id",
        onDelete: "CASCADE",
      });
      organisation.hasMany(models.organisation_invite, {
        foreignKey: "organisation_id",
        onDelete: "CASCADE",
      });
      organisation.hasMany(models.project, {
        foreignKey: "organisation_id",
        onDelete: "CASCADE",
      });
    }
  }
  organisation.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      owner_id: { type: DataTypes.UUID, allowNull: false },
      name: { type: DataTypes.STRING, allowNull: false },
      type: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING },
    },
    {
      sequelize,
      modelName: "organisation",
      underscored: true,
    }
  );
  return organisation;
};
