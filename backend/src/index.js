const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
require("./models/indexModels");

const db = require("./models/indexModels");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const knowledgeBaseRoutes = require("./routes/knowledgeBaseRoutes");
const chatbotRoutes = require("./routes/chatbotRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const destinasiRoutes = require("./routes/destinasiRoutes");

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "../uploads")
  )
);
app.use(express.urlencoded({ extended: true }));

// STATIC
app.use("/uploads", express.static("uploads"));

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/knowledge-base", knowledgeBaseRoutes);
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/destinations", destinasiRoutes);
// TEST
app.get("/", (req, res) => {
  res.send("API Running...");
});

// START SERVER
const startServer = async () => {
  try {
    await db.sequelize.authenticate();

    console.log("Database connected");
    console.log("Tables synced");
const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error);
  }
};

startServer();