import { useState } from "react";
import axios from "axios";

export default function TestCases({ code, language, setTestCases }) {
  const [testCases, setLocalTestCases] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGenerateTests = async () => {
    if (!code) {
      alert("Please enter code.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/code/test", {
        code,
        language,
      });

      if (response.data.success) {
        setLocalTestCases(response.data.testCases);
        setTestCases(response.data.testCases);
      } else {
        console.error("Test case generation failed:", response.data.error);
      }
    } catch (error) {
      console.error("Error generating test cases:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl bg-gray-800 p-5 rounded-lg shadow-lg">
      <button
        onClick={handleGenerateTests}
        className="bg-purple-500 p-2 rounded mt-2"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Test Cases"}
      </button>
      <div className="mt-4 bg-gray-700 p-3 rounded-lg text-white whitespace-pre-wrap">
        {testCases.length > 0 ? (
          <div className="flex flex-col gap-3">
            {testCases.map((test, index) => (
              <div
                key={index}
                className="flex flex-col bg-gray-600 p-3 rounded-lg"
              >
                <p className="text-blue-300 font-semibold">Test {index + 1}</p>

                <div className="bg-gray-700 p-2 rounded-lg">
                  <p className="text-gray-300">
                    <strong>Input:</strong>{" "}
                    {typeof test.input === "object"
                      ? JSON.stringify(test.input)
                      : test.input}
                  </p>
                </div>

                <div className="bg-gray-700 p-2 mt-2 rounded-lg">
                  <p className="text-green-300">
                    <strong>Expected Output:</strong>{" "}
                    {test.expectedOutput !== undefined
                      ? test.expectedOutput
                      : "⚠️ Not Generated"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No test cases generated yet.</p>
        )}
      </div>
    </div>
  );
}
