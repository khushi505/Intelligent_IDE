const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post("/", async (req, res) => {
  const { code } = req.body;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent`,
      { prompt: `Fix errors in this code:\n ${code}` },
      { headers: { Authorization: `Bearer ${process.env.GEMINI_API_KEY}` } }
    );

    res.json({ fixedCode: response.data.candidates[0].output });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
