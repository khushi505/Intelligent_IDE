import React, { useState } from "react";
import Editor from "@monaco-editor/react";

function CodeEditor() {
  const [code, setCode] = useState("");

  return (
    <div className="w-1/2 p-4 bg-gray-200">
      <Editor
        height="400px"
        defaultLanguage="javascript"
        value={code}
        onChange={setCode}
      />
    </div>
  );
}

export default CodeEditor;
