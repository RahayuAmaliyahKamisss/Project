// routes/knowledgeBaseRoutes.js

const express = require("express");
const router = express.Router();

const {
  getAllKnowledgeBase,
  getKnowledgeBaseById,
  createKnowledgeBase,
  updateKnowledgeBase,
  deleteKnowledgeBase,
} = require("../controllers/knowledgeBaseController");

/*
========================================
ROUTES KNOWLEDGE BASE
========================================
*/

router.get("/", getAllKnowledgeBase);

router.get("/:id", getKnowledgeBaseById);

router.post("/", createKnowledgeBase);

router.put("/:id", updateKnowledgeBase);

router.delete("/:id", deleteKnowledgeBase);

module.exports = router;