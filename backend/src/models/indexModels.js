const sequelize = require("../config/database");

const User = require("./userModels");
const KnowledgeBase = require("./knowladgeBase");
const Destination = require("./Destination");
const DestinationImage = require("./DestinationImage");
const Category = require("./category");

// RELATION
Destination.hasMany(DestinationImage, {
  foreignKey: "destination_id",
  as: "images",
});

DestinationImage.belongsTo(Destination, {
  foreignKey: "destination_id",
  as: "destination",
});

const db = {};

db.sequelize = sequelize;

db.User = User;
db.KnowledgeBase = KnowledgeBase;
db.Destination = Destination;
db.DestinationImage = DestinationImage;
db.Category = Category;

module.exports = db;