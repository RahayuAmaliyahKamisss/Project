// models/KnowledgeBase.js

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const KnowledgeBase = sequelize.define(
  "KnowledgeBase",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    question: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    answer: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    category: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    keyword: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "knowledge_base", // harus sama dengan nama tabel di MySQL
    timestamps: false, // karena pakai created_at dan updated_at manual

    indexes: [
      {
        name: "idx_category",
        fields: ["category"],
      },
      {
        name: "idx_created_at",
        fields: ["created_at"],
      },
    ],
  }
);

module.exports = KnowledgeBase;