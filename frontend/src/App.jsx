import { useState } from "react";
import InputPanel from "./components/InputPanel";
import CodeEditor from "./components/CodeEditor";
import DebuggingPanel from "./components/DebuggingPanel";
import TestCases from "./components/TestCases";
import OutputPanel from "./components/OutputPanel";

export default function App() {
  const [code, setCode] = useState("");
  const [expectedOutput, setExpectedOutput] = useState("0"); // Default value to ensure non-null state
  const [testCases, setTestCases] = useState([]);

  return (
    <div className="p-10 bg-gray-900 text-white min-h-screen flex flex-col gap-8 items-center font-sans">
      <h1 className="text-4xl font-extrabold text-center text-blue-400 shadow-lg p-3">
        AI-Powered Code IDE
      </h1>

      {/* Problem Statement Section */}
      <div className="w-full max-w-3xl bg-gray-800 p-5 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-2 text-blue-300">
          Problem Statement
        </h2>
        <InputPanel setCode={setCode} setExpectedOutput={setExpectedOutput} />
      </div>

      {/* Solution Section */}
      <div className="w-full max-w-3xl bg-gray-800 p-5 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-2 text-green-300">Solution</h2>
        <CodeEditor code={code} setCode={setCode} />
      </div>

      {/* Debug Code Section */}
      <div className="w-full max-w-3xl bg-gray-800 p-5 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-2 text-yellow-300">
          Debug Code
        </h2>
        <DebuggingPanel code={code} />
      </div>

      {/* Test Cases Section */}
      <div className="w-full max-w-3xl bg-gray-800 p-5 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-2 text-purple-300">
          Test Cases
        </h2>
        <TestCases code={code} setTestCases={setTestCases} />
      </div>

      {/* Output Section */}
      <div className="w-full max-w-3xl text-center bg-gray-800 p-5 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-2 text-purple-300">Output</h2>
        <OutputPanel code={code} expectedOutput={expectedOutput} />
      </div>
    </div>
  );
}
