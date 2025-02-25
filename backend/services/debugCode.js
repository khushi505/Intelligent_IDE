// import axios from "axios";

// const debugWithGemini = async (code) => {
//   const apiKey = process.env.GEMINI_API_KEY; // Replace with your actual key

//   // const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

//   const apiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`;

//   try {
//     const response = await axios.post(apiUrl, {
//       contents: [{ parts: [{ text: `Debug this code: ${code}` }] }],
//     });

//     return (
//       response.data.candidates?.[0]?.content ||
//       "Error: No response from Gemini API."
//     );
//   } catch (error) {
//     console.error("Error debugging with Gemini API:", error);
//     return "Error: Unable to process the request.";
//   }
// };

// export default debugWithGemini;

import axios from "axios";

const debugWithGemini = async (code) => {
  const apiKey = process.env.GEMINI_API_KEY;

  const apiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`;

  try {
    const prompt = `
    You are an AI code debugger.
    Analyze the following code and determine if it contains any syntax errors, logical errors, or inefficiencies. Parse the code line by line to check the syntax, semantic, logical errors.
    - If the code is *already correct and optimized, respond with *"Code is correct. No changes needed."**
    - If issues exist, debug the code and return *only the corrected version*.

    Code to debug:
    ${code}
    `;

    const response = await axios.post(apiUrl, {
      contents: [{ parts: [{ text: prompt }] }],
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
