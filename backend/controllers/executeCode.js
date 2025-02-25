import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const executeCode = async (req, res) => {
  try {
    const { code, userInput } = req.body;

    if (!code) {
      return res.status(400).json({ error: "Code is required!" });
    }
    if (!userInput) {
      return res.status(400).json({ error: "User input is required!" });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const apiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`;

    const prompt = `
      You are an AI that executes coding functions.
      Given the function below and user input, execute the function with the provided input.
      Return only the final computed output.

      Function:
      ${code}

      Input:
      ${userInput}
    `;

    const response = await axios.post(apiUrl, {
      contents: [{ parts: [{ text: prompt }] }],
    });

    const output =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text || "Error";

    res.json({ output: output.trim() });
  } catch (error) {
    console.error(
      "🚨 Error executing code:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default executeCode;
