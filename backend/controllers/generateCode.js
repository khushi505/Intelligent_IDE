import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config(); // Load API Key from .env

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateCode = async (req, res) => {
  try {
    const { prompt } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);

    const responseText = await result.response.text();

    res.json({ code: responseText });
  } catch (error) {
    console.error("Error generating code:", error);
    res.status(500).json({ error: "Error generating code" });
  }
};

export default generateCode;
