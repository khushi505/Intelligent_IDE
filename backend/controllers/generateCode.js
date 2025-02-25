import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateCode = async (req, res) => {
  try {
    const { prompt, language } = req.body;
    if (!prompt || !language) {
      return res
        .status(400)
        .json({ error: "Prompt and language are required!" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(
      `Write a ${language} program for: ${prompt}`
    );
    const responseText = await result.response.text();

    res.json({ code: responseText });
  } catch (error) {
    console.error("Error generating code:", error);
    res.status(500).json({ error: "Error generating code" });
  }
};

export default generateCode;
