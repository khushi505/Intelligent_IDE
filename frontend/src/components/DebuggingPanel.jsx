import React, { useState } from "react";
import axios from "axios";

function DebuggingPanel() {
  const [debuggingLogs, setDebuggingLogs] = useState("");

  const debugCode = async () => {
    const response = await axios.post("http://localhost:5000/debug-code", {
      code: debuggingLogs,
    });
    setDebuggingLogs(response.data.fixedCode);
  };

  return (
    <div className="w-1/4 p-4 bg-gray-100">
      <h3 className="font-bold">AI Debugging</h3>
      <textarea
        className="w-full p-2 border"
        rows="5"
        value={debuggingLogs}
        onChange={(e) => setDebuggingLogs(e.target.value)}
      />
      <button
        className="w-full p-2 mt-2 bg-red-500 text-white"
        onClick={debugCode}
      >
        Fix Code
      </button>
    </div>
  );
}

export default DebuggingPanel;
