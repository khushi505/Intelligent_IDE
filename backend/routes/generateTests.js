const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post("/", async (req, res) => {
  const { code } = req.body;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent`,
      { prompt: `Generate Jest unit tests for this function:\n ${code}` },
      { headers: { Authorization: `Bearer ${process.env.GEMINI_API_KEY}` } }
    );

    res.json({ testCases: response.data.candidates[0].output });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
