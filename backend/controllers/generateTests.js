import generateTestCases from "../services/generateTests.js";

export const generateTests = async (req, res) => {
  try {
    const { code, userInputs } = req.body;

    // Call service with user-defined inputs
    const testCases = await generateTestCases(code, userInputs);

    res.json({ success: true, testCases });
  } catch (error) {
    console.error("Error generating test cases:", error);
    res.status(500).json({ error: "Error generating test cases." });
  }
};

export default generateTests;
