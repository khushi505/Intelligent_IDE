import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const generateTestCases = async (code) => {
  const apiKey = process.env.GEMINI_API_KEY;
  const apiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`;

  try {
    const prompt = `
      Generate a JSON array of test cases for the given function. 
      Each test case must include:
      - "input": A dictionary containing function arguments with the correct data types.
      - "expectedOutput": The expected return value with the correct data type.

      Ensure:
      - If the function expects **integers**, provide **integer** inputs and an **integer** output.
      - If the function expects **floats**, provide **float** inputs and a **float** output.
      - If the function expects **both integers and floats**, allow mixed inputs (e.g., 2, 3.5).
      - If the function expects **strings**, provide **string** inputs and a **string** output.
      - If the function expects **booleans**, provide **boolean** inputs and a **boolean** output.
      - If the function expects **lists/arrays**, provide lists and return a list in the expected output.
      - The **expected output type must match** the function return type.
      - The function should **never reject valid numerical inputs (integers or floats)** unless explicitly required.
      - The function should **provide meaningful test cases** for edge cases like negative values, zero, and large numbers.

      Example Test Cases:
      [
        { "input": { "num1": 2, "num2": 3 }, "expectedOutput": 5 },
        { "input": { "num1": -1, "num2": -2 }, "expectedOutput": -3 },
        { "input": { "num1": 3.5, "num2": 1.5 }, "expectedOutput": 5.0 },
        { "input": { "text": "hello", "times": 3 }, "expectedOutput": "hellohellohello" },
        { "input": { "arr": [1, 2, 3] }, "expectedOutput": [2, 4, 6] },
        { "input": { "a": true, "b": false }, "expectedOutput": true }
      ]

      Code:
      ${code}

      Respond **ONLY** with the JSON array, no extra text.
    `;

    const response = await axios.post(apiUrl, {
      contents: [{ parts: [{ text: prompt }] }],
    });

    let rawTestCases =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // 🔹 Extract JSON block using regex
    const jsonMatch = rawTestCases.match(/\[.*\]/s);
    if (!jsonMatch)
      throw new Error("Invalid JSON format received from Gemini API");

    const testCases = JSON.parse(jsonMatch[0]);

    // ✅ Validate that all test cases have required fields
    if (!Array.isArray(testCases) || testCases.length === 0) {
      throw new Error(
        "Gemini API returned an empty or invalid test case list."
      );
    }

    // ✅ Ensure proper structure of test cases
    testCases.forEach((test, index) => {
      if (!test.input || test.expectedOutput === undefined) {
        console.warn(
          `⚠️ Warning: Test case ${index + 1} is missing required fields.`
        );
      }
    });

    return testCases; // ✅ Return the correctly formatted test cases
  } catch (error) {
    console.error(
      "🚨 Gemini API Error:",
      error.response?.data || error.message
    );
    return []; // Return an empty array if an error occurs
  }
};

export default generateTestCases;
