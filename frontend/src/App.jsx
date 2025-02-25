import { useState } from "react";
import CodeEditor from "./components/CodeEditor";
import DebuggingPanel from "./components/DebuggingPanel";
import InputPanel from "./components/InputPanel";
import OutputPanel from "./components/OutputPanel";
import TestCases from "./components/TestCases";

export default function App() {
  const [code, setCode] = useState("");
  const [debuggedCode, setDebuggedCode] = useState("");
  const [expectedOutput, setExpectedOutput] = useState("");
  const [testCases, setTestCases] = useState([]);
  const [language, setLanguage] = useState("javascript"); // Added state for language selection

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
        <InputPanel
          setCode={setCode}
          setExpectedOutput={setExpectedOutput}
          setLanguage={setLanguage}
        />
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
        <DebuggingPanel code={code} setDebuggedCode={setDebuggedCode} />
      </div>

      {/* Test Cases Section */}
      <div className="w-full max-w-3xl bg-gray-800 p-5 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-2 text-purple-300">
          Test Cases
        </h2>
        <TestCases
          code={code}
          setTestCases={setTestCases}
          language={language}
        />
      </div>

      {/* Your Output Section */}
      <div className="w-full max-w-3xl text-center bg-gray-800 p-5 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-2 text-purple-300">Output</h2>
        <OutputPanel
          code={code}
          expectedOutput={expectedOutput}
          language={language}
        />
        <div className="flex justify-center items-center gap-4 mt-4 text-lg font-bold">
          <p className="p-2 bg-gray-700 text-white rounded-lg">Your Output</p>
          <span className="text-3xl text-green-400">✔️</span> /{" "}
          <span className="text-3xl text-red-400">❌</span>
        </div>
      </div>
    </div>
  );
}
