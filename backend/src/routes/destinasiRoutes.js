const express = require("express");
const router = express.Router();

const multer = require("multer");
const path = require("path");
const fs = require("fs");

const {
  getAllDestinations,
  getDestinationById,
  createDestination,
  updateDestination,
  deleteDestination,
} = require("../controllers/destinasiController");

// ==============================
// CREATE UPLOAD FOLDER
// ==============================
const uploadPath = path.join(
  __dirname,
  "../../uploads/destinations"
);

// otomatis buat folder jika belum ada
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, {
    recursive: true,
  });
}

// ==============================
// MULTER CONFIG
// ==============================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

// ==============================
// FILE FILTER
// ==============================
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "File harus berupa gambar JPG, PNG, atau WEBP"
      ),
      false
    );
  }
};

// ==============================
// MULTER UPLOAD
// ==============================
const upload = multer({
  storage,
  fileFilter,

  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

// ==============================
// ROUTES
// ==============================

// GET ALL
router.get("/", getAllDestinations);

// GET DETAIL
router.get("/:id", getDestinationById);

// CREATE
router.post(
  "/",
  upload.array("images", 10),
  createDestination
);

// UPDATE
router.put(
  "/:id",
  upload.array("images", 10),
  updateDestination
);

// DELETE
router.delete("/:id", deleteDestination);

module.exports = router;