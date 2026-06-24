const express = require("express");

const router = express.Router();

const userController = require("../controllers/userController");

// GET
router.get("/", userController.getUsers);
router.get("/:id", userController.getUserById);

// CREATE
router.post("/", userController.createUser);

// UPDATE
router.put("/:id", userController.updateUser);

// RESET PASSWORD
router.put(
  "/reset-password/:id",
  userController.resetPassword
);

// DELETE
router.delete("/:id", userController.deleteUser);

module.exports = router;