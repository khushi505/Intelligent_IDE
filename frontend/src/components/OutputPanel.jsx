import { useState } from "react";
import axios from "axios";

export default function OutputPanel({ code }) {
  const [results, setResults] = useState([
    { userInput: "", expectedOutput: "", actualOutput: "-", isCorrect: null },
  ]);

  const handleExecuteCode = async (index) => {
    if (!code.trim()) {
      alert("Please generate or enter code first!");
      return;
    }

    const testCase = results[index];

    if (!testCase.userInput.trim() || !testCase.expectedOutput.trim()) {
      alert("Please enter both input and expected output in the table!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/code/execute",
        { code, userInput: testCase.userInput }
      );

      const output = response.data.output.trim();
      const isCorrect = output === testCase.expectedOutput.trim();

      setResults((prevResults) => {
        const updatedResults = [...prevResults];
        updatedResults[index] = {
          ...updatedResults[index],
          actualOutput: output,
          isCorrect,
        };
        return updatedResults;
      });
    } catch (error) {
      console.error("🚨 Error executing code:", error);
      alert("Execution Failed. Check server logs.");
    }
  };

  const addNewTestCase = () => {
    setResults([
      ...results,
      { userInput: "", expectedOutput: "", actualOutput: "-", isCorrect: null },
    ]);
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg flex flex-col h-full">
      <h2 className="text-xl font-bold mb-2 text-purple-300">
        Execution Results
      </h2>

      <table className="w-full border-collapse border border-gray-700 text-white">
        <thead>
          <tr className="bg-gray-700">
            <th className="border border-gray-600 p-2">Input (User)</th>
            <th className="border border-gray-600 p-2">Expected Output</th>
            <th className="border border-gray-600 p-2">Output (Code)</th>
            <th className="border border-gray-600 p-2">Matching</th>
            <th className="border border-gray-600 p-2">Run</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={index} className="text-center">
              <td className="border border-gray-600 p-2">
                <input
                  type="text"
                  className="w-full p-1 bg-gray-700 text-white border rounded"
                  placeholder="Enter input..."
                  value={result.userInput}
                  onChange={(e) => {
                    const newResults = [...results];
                    newResults[index].userInput = e.target.value;
                    setResults(newResults);
                  }}
                />
              </td>
              <td className="border border-gray-600 p-2">
                <input
                  type="text"
                  className="w-full p-1 bg-gray-700 text-white border rounded"
                  placeholder="Expected Output"
                  value={result.expectedOutput}
                  onChange={(e) => {
                    const newResults = [...results];
                    newResults[index].expectedOutput = e.target.value;
                    setResults(newResults);
                  }}
                />
              </td>
              <td className="border border-gray-600 p-2">
                {result.actualOutput}
              </td>
              <td className="border border-gray-600 p-2">
                {result.isCorrect === null
                  ? "⌛ Waiting..."
                  : result.isCorrect
                  ? "✔️"
                  : "❌"}
              </td>
              <td className="border border-gray-600 p-2">
                <button
                  className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  onClick={() => handleExecuteCode(index)}
                >
                  Run
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        className="mt-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        onClick={addNewTestCase}
      >
        Add New Test Case
      </button>
    </div>
  );
}
