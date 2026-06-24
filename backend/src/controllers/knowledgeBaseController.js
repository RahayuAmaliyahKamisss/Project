// controllers/knowledgeBaseController.js

const { KnowledgeBase } = require("../models/indexModels");

/*
========================================
GET ALL KNOWLEDGE BASE
========================================
*/

exports.getAllKnowledgeBase = async (req, res) => {
  try {
    const data = await KnowledgeBase.findAll({
      order: [["id", "DESC"]],
    });

    res.status(200).json({
      success: true,
      message: "Data knowledge base berhasil diambil",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gagal mengambil data knowledge base",
      error: error.message,
    });
  }
};

/*
========================================
GET KNOWLEDGE BASE BY ID
========================================
*/

exports.getKnowledgeBaseById = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await KnowledgeBase.findByPk(id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Data knowledge base tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      message: "Detail knowledge base berhasil diambil",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gagal mengambil detail knowledge base",
      error: error.message,
    });
  }
};

/*
========================================
CREATE KNOWLEDGE BASE
========================================
*/

exports.createKnowledgeBase = async (req, res) => {
  try {
    const {
      question,
      answer,
      category,
      keyword,
    } = req.body;

    if (!question || !answer) {
      return res.status(400).json({
        success: false,
        message: "Question dan Answer wajib diisi",
      });
    }

    const newData = await KnowledgeBase.create({
      question,
      answer,
      category,
      keyword,
    });

    res.status(201).json({
      success: true,
      message: "Knowledge base berhasil ditambahkan",
      data: newData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gagal menambahkan knowledge base",
      error: error.message,
    });
  }
};

/*
========================================
UPDATE KNOWLEDGE BASE
========================================
*/

exports.updateKnowledgeBase = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      question,
      answer,
      category,
      keyword,
    } = req.body;

    const data = await KnowledgeBase.findByPk(id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Data knowledge base tidak ditemukan",
      });
    }

    await data.update({
      question,
      answer,
      category,
      keyword,
      updated_at: new Date(),
    });

    res.status(200).json({
      success: true,
      message: "Knowledge base berhasil diperbarui",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gagal memperbarui knowledge base",
      error: error.message,
    });
  }
};

/*
========================================
DELETE KNOWLEDGE BASE
========================================
*/

exports.deleteKnowledgeBase = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await KnowledgeBase.findByPk(id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Data knowledge base tidak ditemukan",
      });
    }

    await data.destroy();

    res.status(200).json({
      success: true,
      message: "Knowledge base berhasil dihapus",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gagal menghapus knowledge base",
      error: error.message,
    });
  }
};