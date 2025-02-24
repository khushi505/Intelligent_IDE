import React from "react";
import InputPanel from "./components/InputPanel";
import CodeEditor from "./components/CodeEditor";
import TestCases from "./components/TestCases";
import OutputPanel from "./components/OutputPanel";
import DebuggingPanel from "./components/DebuggingPanel";

function App() {
  return (
    <div className="flex h-screen p-4 space-x-4">
      <InputPanel />
      <CodeEditor />
      <TestCases />
      <OutputPanel />
      <DebuggingPanel />
    </div>
  );
}

export default App;
