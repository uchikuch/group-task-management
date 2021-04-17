"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class organisation extends Model {
    static associate(models) {
      // define association here
      organisation.belongsTo(models.user, {
        through: models.JoinTable,
        foreignKey: "id",
        onDelete: "CASCADE",
      });
      organisation.hasMany(models.organisation_invite, {
        through: models.JoinTable,
        foreignKey: "id",
        onDelete: "CASCADE",
      });
      organisation.hasMany(models.organisation_member, {
        through: models.JoinTable,
        foreignKey: "id",
        onDelete: "CASCADE",
      });
      organisation.hasMany(models.project_member, {
        through: models.JoinTable,
        foreignKey: "id",
        onDelete: "CASCADE",
      });
      organisation.hasMany(models.project, {
        through: models.JoinTable,
        foreignKey: "id",
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
