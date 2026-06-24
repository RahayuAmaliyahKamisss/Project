// models/Destination.js

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Destination = sequelize.define(
  "Destination",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    village: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    district: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    regency: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "Sukabumi",
    },

    province: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "Jawa Barat",
    },

    ticket_price: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    opening_hours: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    facilities: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    maps_link: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "Link Google Maps lokasi destinasi",
    },

    contact_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },

    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },

    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "destinations",
    timestamps: false,

    indexes: [
      {
        name: "idx_destination_name",
        fields: ["name"],
      },
      {
        name: "idx_district",
        fields: ["district"],
      },
      {
        name: "idx_is_active",
        fields: ["is_active"],
      },
    ],
  }
);

module.exports = Destination;