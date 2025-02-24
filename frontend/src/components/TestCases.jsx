import React, { useState } from "react";
import axios from "axios";

function TestCases() {
  const [testCases, setTestCases] = useState([{ input: "", expected: "" }]);

  const addTestCase = () => {
    setTestCases([...testCases, { input: "", expected: "" }]);
  };

  const runTests = async () => {
    const response = await axios.post("http://localhost:5000/execute-code", {
      testCases,
    });
    console.log("Test Results:", response.data);
  };

  return (
    <div className="w-1/4 p-4 bg-gray-100">
      <h3 className="font-bold">Test Cases</h3>
      {testCases.map((test, index) => (
        <div key={index} className="mt-2">
          <input
            type="text"
            placeholder="Input"
            className="w-full p-2 border"
            value={test.input}
            onChange={(e) => {
              const newCases = [...testCases];
              newCases[index].input = e.target.value;
              setTestCases(newCases);
            }}
          />
          <input
            type="text"
            placeholder="Expected Output"
            className="w-full p-2 border mt-1"
            value={test.expected}
            onChange={(e) => {
              const newCases = [...testCases];
              newCases[index].expected = e.target.value;
              setTestCases(newCases);
            }}
          />
        </div>
      ))}
      <button
        className="w-full p-2 mt-2 bg-green-500 text-white"
        onClick={addTestCase}
      >
        Add Test Case
      </button>
      <button
        className="w-full p-2 mt-2 bg-blue-500 text-white"
        onClick={runTests}
      >
        Run Tests
      </button>
    </div>
  );
}

export default TestCases;
