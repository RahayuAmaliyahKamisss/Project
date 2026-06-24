// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const User = require("../models/userModels");

// // ================= REGISTER =================
// exports.register = async (req, res) => {
//   try {
//     const { nama, email, password } = req.body;

//     // VALIDASI
//     if (!nama || !email || !password) {
//       return res.status(400).json({
//         message: "Nama, email, dan password wajib diisi",
//       });
//     }

//     // CEK EMAIL
//     const existingUser = await User.findOne({ where: { email } });
//     if (existingUser) {
//       return res.status(409).json({
//         message: "Email sudah terdaftar",
//       });
//     }

//     // HASH PASSWORD
//     const hash = await bcrypt.hash(password, 10);

//     // SIMPAN USER
//     await User.create({
//       nama,
//       email,
//       password: hash,
//       role: "user",
//     });

//     res.status(201).json({
//       message: "Register berhasil",
//     });
//   } catch (error) {
//     console.error("REGISTER ERROR:", error);
//     res.status(500).json({
//       message: "Register gagal",
//       error: error.message,
//     });
//   }
// };

// // ================= LOGIN =================
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // CEK USER
//     const user = await User.findOne({ where: { email } });
//     if (!user) {
//       return res.status(401).json({ message: "Email salah" });
//     }

//     // CEK PASSWORD
//     const valid = await bcrypt.compare(password, user.password);
//     if (!valid) {
//       return res.status(401).json({ message: "Password salah" });
//     }

//     // BUAT TOKEN
//     jwt.sign(
//       { id: user.id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.json({
//       token,
//       user: {
//         id: user.id,
//         nama: user.nama,
//         email: user.email,
//         role: user.role,
//       },
//     });
//   } catch (error) {
//     console.error("LOGIN ERROR:", error);
//     res.status(500).json({
//       message: "Login gagal",
//       error: error.message,
//     });
//   }
// };

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModels");

require("dotenv").config();

// ================= REGISTER =================
exports.register = async (req, res) => {
  try {
    const { nama, email, password } = req.body;

    // VALIDASI
    if (!nama || !email || !password) {
      return res.status(400).json({
        message: "Nama, email, dan password wajib diisi",
      });
    }

    // CEK EMAIL
    const existingUser = await User.findOne({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Email sudah terdaftar",
      });
    }

    // HASH PASSWORD
    const hash = await bcrypt.hash(password, 10);

    // SIMPAN USER
    const newUser = await User.create({
      nama,
      email,
      password: hash,
      role: "user",
    });

    res.status(201).json({
      message: "Register berhasil",
      user: {
        id: newUser.id,
        nama: newUser.nama,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    res.status(500).json({
      message: "Register gagal",
      error: error.message,
    });
  }
};

// ================= LOGIN =================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // VALIDASI
    if (!email || !password) {
      return res.status(400).json({
        message: "Email dan password wajib diisi",
      });
    }

    // CEK USER
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({
        message: "Email salah",
      });
    }

    // CEK PASSWORD
    const valid = await bcrypt.compare(
      password,
      user.password
    );

    if (!valid) {
      return res.status(401).json({
        message: "Password salah",
      });
    }

    // TOKEN
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      message: "Login berhasil",
      token,
      user: {
        id: user.id,
        nama: user.nama,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    res.status(500).json({
      message: "Login gagal",
      error: error.message,
    });
  }
};