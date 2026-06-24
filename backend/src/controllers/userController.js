const bcrypt = require("bcrypt");
const User = require("../models/userModels");

// ================= GET ALL USERS =================
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ["password"],
      },
      order: [["id", "DESC"]],
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil user",
      error: error.message,
    });
  }
};

// ================= GET USER BY ID =================
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id, {
      attributes: {
        exclude: ["password"],
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User tidak ditemukan",
      });
    }

    res.json(user);

  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil user",
      error: error.message,
    });
  }
};

// ================= CREATE USER =================
exports.createUser = async (req, res) => {
  try {
    const { nama, email, password, role } = req.body;

    const existing = await User.findOne({
      where: { email },
    });

    if (existing) {
      return res.status(400).json({
        message: "Email sudah digunakan",
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      nama,
      email,
      password: hash,
      role,
    });

    res.status(201).json({
      message: "User berhasil ditambahkan",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal menambah user",
      error: error.message,
    });
  }
};

  // ================= UPDATE USER =================
  exports.updateUser = async (req, res) => {
    try {
      const { id } = req.params;

      const {
        nama,
        email,
        role,
        password,
      } = req.body;

      const updateData = {
        nama,
        email,
      };

      // role optional
      if (role) {
        updateData.role = role;
      }

      // jika password diisi
      if (password) {
        const hash = await bcrypt.hash(password, 10);

        updateData.password = hash;
      }

      await User.update(updateData, {
        where: { id },
      });

      res.json({
        message: "User berhasil diupdate",
      });

    } catch (error) {
      res.status(500).json({
        message: "Gagal update user",
        error: error.message,
      });
    }
  };

// ================= RESET PASSWORD =================
exports.resetPassword = async (req, res) => {
  try {
    const { id } = req.params;

    const { password } = req.body;

    const hash = await bcrypt.hash(password, 10);

    await User.update(
      {
        password: hash,
      },
      {
        where: { id },
      }
    );

    res.json({
      message: "Password berhasil direset",
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal reset password",
      error: error.message,
    });
  }
};

// ================= DELETE USER =================
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await User.destroy({
      where: { id },
    });

    res.json({
      message: "User berhasil dihapus",
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal menghapus user",
      error: error.message,
    });
  }
};