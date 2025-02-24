const express = require("express");
const multer = require("multer");
const Tesseract = require("tesseract.js");
const router = express.Router();

// Configure Multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const {
      data: { text },
    } = await Tesseract.recognize(req.file.buffer, "eng");
    res.json({ text });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
