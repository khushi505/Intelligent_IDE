import { useState } from "react";
import axios from "axios";

export default function TestCases({ code, language, setTestCases }) {
  const [testCases, setLocalTestCases] = useState([]);

  const handleGenerateTests = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/code/test", {
        code,
        language,
      });
      setLocalTestCases(response.data.testCases);
      setTestCases(response.data.testCases);
    } catch (error) {
      console.error("Error generating test cases:", error);
    }
  };

  return (
    <div className="w-full max-w-3xl bg-gray-800 p-5 rounded-lg shadow-lg">
      {/* <h2 className="text-lg font-semibold mb-2 text-purple-300">Test Cases</h2> */}
      <button
        onClick={handleGenerateTests}
        className="bg-purple-500 p-2 rounded mt-2"
      >
        Generate Test Cases
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
                    <strong>Input:</strong> {test.input}
                  </p>
                </div>
                <div className="bg-gray-700 p-2 mt-2 rounded-lg">
                  <p className="text-green-300">
                    <strong>Expected Output:</strong> {test.expectedOutput}
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
