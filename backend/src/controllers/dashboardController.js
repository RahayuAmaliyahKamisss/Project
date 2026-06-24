const { QueryTypes } = require("sequelize");

const sequelize = require("../config/database");

const User = require("../models/userModels");
const Destination = require("../models/destination");
const DestinationImage = require("../models/destinationImage");

exports.getDashboardStats = async (req, res) => {
  try {
    // =========================
    // TOTAL DATA
    // =========================
    const totalUsers = await User.count({
      where: {
        role: "user",
      },
    });

    const totalDestinations =
      await Destination.count();

    const totalGallery =
      await DestinationImage.count();

    // =========================
    // USER BULANAN
    // =========================
    const monthlyUsers =
      await sequelize.query(
        `
        SELECT
          MONTHNAME(created_at) AS month,
          MONTH(created_at) AS month_number,
          COUNT(id) AS total
        FROM users
        WHERE role = 'user'
        GROUP BY
          MONTH(created_at),
          MONTHNAME(created_at)
        ORDER BY MONTH(created_at)
        `,
        {
          type: QueryTypes.SELECT,
        }
      );

    // =========================
    // DESTINASI BULANAN
    // =========================
    const monthlyDestinations =
      await sequelize.query(
        `
        SELECT
          MONTHNAME(created_at) AS month,
          MONTH(created_at) AS month_number,
          COUNT(id) AS total
        FROM destinations
        GROUP BY
          MONTH(created_at),
          MONTHNAME(created_at)
        ORDER BY MONTH(created_at)
        `,
        {
          type: QueryTypes.SELECT,
        }
      );

    // =========================
    // USER TERBARU
    // =========================
    const latestActivities =
      await User.findAll({
        where: {
          role: "user",
        },

        attributes: [
          "id",
          "nama",
          "email",
          "created_at",
        ],

        limit: 5,

        order: [["created_at", "DESC"]],
      });

    return res.status(200).json({
      success: true,

      totalUsers,
      totalDestinations,
      totalGallery,

      monthlyUsers,
      monthlyDestinations,

      latestActivities,
    });
  } catch (error) {
    console.error(
      "Dashboard Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};