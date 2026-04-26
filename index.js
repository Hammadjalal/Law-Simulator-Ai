const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

// Load .env explicitly (more reliable)
dotenv.config({ path: path.resolve(__dirname, ".env") });

const chatRoutes = require("./routes/chat");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check route
app.get("/", (req, res) => {
  res.json({ message: "🚀 Law Police AI Server Running" });
});

// API routes
app.use("/api/chat", chatRoutes);

// DEBUG: check env loading
if (!process.env.GROQ_API_KEY) {
  console.log("❌ GROQ API KEY NOT FOUND (check .env file location)");
} else {
  console.log("✅ GROQ API KEY LOADED SUCCESSFULLY");
}

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});