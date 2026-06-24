// models/DestinationImage.js

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const DestinationImage = sequelize.define(
  "DestinationImage",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    destination_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    image_caption: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "destination_images",
    timestamps: false,
  }
);

module.exports = DestinationImage;