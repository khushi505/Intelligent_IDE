import axios from "axios";

const debugWithGemini = async (code) => {
  const apiKey = process.env.GEMINI_API_KEY; // Replace with your actual key

  // const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  const apiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`;

  try {
    const response = await axios.post(apiUrl, {
      contents: [{ parts: [{ text: `Debug this code: ${code}` }] }],
    });

    return (
      response.data.candidates?.[0]?.content ||
      "Error: No response from Gemini API."
    );
  } catch (error) {
    console.error("Error debugging with Gemini API:", error);
    return "Error: Unable to process the request.";
  }
};

export default debugWithGemini;
