const express = require("express");

const router = express.Router();

const {
  createFeedback,
  getAllFeedback,
  getFeedbackById,
  updateFeedbackStatus,
  deleteFeedback,
} = require("../controllers/feedbackController");


// ============================
// USER
// ============================

// Kirim feedback
router.post("/", createFeedback);


// ============================
// ADMIN
// ============================

// Ambil semua feedback
router.get("/", getAllFeedback);

// Ambil feedback by id
router.get("/:id", getFeedbackById);

// Update status feedback
router.put("/:id", updateFeedbackStatus);

// Hapus feedback
router.delete("/:id", deleteFeedback);


module.exports = router;