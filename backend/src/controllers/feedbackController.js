// controllers/feedbackController.js

const db = require("../config/database");
const sequelize = require("../config/database");
const { QueryTypes } = require("sequelize");


// ============================
// CREATE FEEDBACK
// ============================
exports.createFeedback = async (req, res) => {
  try {
    const {
      user_id,
      username,
      email,
      category,
      suggestion,
      message,
      rating,
    } = req.body;

    const ip_address = req.ip;
    const device_info = req.headers["user-agent"];

    await sequelize.query(
      `
      INSERT INTO feedback
      (
        user_id,
        username,
        email,
        category,
        suggestion,
        message,
        rating,
        ip_address,
        device_info
      )
      VALUES
      (
        :user_id,
        :username,
        :email,
        :category,
        :suggestion,
        :message,
        :rating,
        :ip_address,
        :device_info
      )
      `,
      {
        replacements: {
          user_id: user_id || null,
          username: username || null,
          email: email || null,
          category,
          suggestion,
          message: message || null,
          rating: rating || 0,
          ip_address,
          device_info,
        },
        type: QueryTypes.INSERT,
      }
    );

    return res.status(201).json({
      success: true,
      message: "Feedback berhasil dikirim",
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Gagal menyimpan feedback",
      error: error.message,
    });
  }
};


// ============================
// GET ALL FEEDBACK
// ============================
exports.getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await sequelize.query(
      `
      SELECT
        f.*,
        u.nama,
        u.email as user_email
      FROM feedback f
      LEFT JOIN users u
        ON f.user_id = u.id
      ORDER BY f.created_at DESC
      `,
      {
        type: QueryTypes.SELECT,
      }
    );

    return res.status(200).json({
      success: true,
      data: feedbacks,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Gagal mengambil feedback",
    });
  }
};

// ============================
// GET FEEDBACK BY ID
// ============================
exports.getFeedbackById = async (req, res) => {
  try {
    const { id } = req.params;

    const sql = `
      SELECT *
      FROM feedback
      WHERE id = ?
    `;

    db.query(sql, [id], (err, results) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          success: false,
          message: "Gagal mengambil feedback",
        });
      }

      if (results.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Feedback tidak ditemukan",
        });
      }

      return res.status(200).json({
        success: true,
        data: results[0],
      });
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


// ============================
// UPDATE STATUS FEEDBACK
// ============================
exports.updateFeedbackStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      status,
      admin_note,
      learning_used,
    } = req.body;

    await sequelize.query(
      `
      UPDATE feedback
      SET
        status = :status,
        admin_note = :admin_note,
        learning_used = :learning_used
      WHERE id = :id
      `,
      {
        replacements: {
          status,
          admin_note: admin_note || null,
          learning_used: learning_used || 0,
          id,
        },
        type: QueryTypes.UPDATE,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Feedback berhasil diperbarui",
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Gagal update feedback",
      error: error.message,
    });
  }
};


// ============================
// DELETE FEEDBACK
// ============================
exports.deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;

    const sql = `
      DELETE FROM feedback
      WHERE id = ?
    `;

    db.query(sql, [id], (err, result) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          success: false,
          message: "Gagal menghapus feedback",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Feedback berhasil dihapus",
      });
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};