import axios from "axios";
import { useState } from "react";

export default function DebuggingPanel({ code }) {
  const [debuggedCode, setDebuggedCode] = useState("");

  const handleDebugCode = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/code/debug",
        { code }
      );

      // Ensure debugged_code is extracted properly
      const debuggedData = response.data.debugged_code;
      const formattedDebuggedCode =
        typeof debuggedData === "object"
          ? JSON.stringify(debuggedData, null, 2)
          : debuggedData;

      setDebuggedCode(formattedDebuggedCode);
    } catch (error) {
      console.error("Error debugging code:", error);
    }
  };

  const formatDebugOutput = (debuggedCode) => {
    try {
      const parsedData = JSON.parse(debuggedCode);
      if (parsedData.parts) {
        return (
          <div className="bg-gray-700 p-3 rounded-lg text-white whitespace-pre-wrap">
            {parsedData.parts.map((part, index) => (
              <p key={index} className="mb-2">
                {part.text}
              </p>
            ))}
          </div>
        );
      }
    } catch (error) {
      return (
        <div className="bg-gray-700 p-3 rounded-lg text-white whitespace-pre-wrap">
          {debuggedCode}
        </div>
      );
    }
  };

  return (
    <div className="w-full">
      <button
        onClick={handleDebugCode}
        className="bg-yellow-500 p-2 rounded mt-2"
      >
        Debug
      </button>
      <pre className="bg-gray-400 p-2 mt-2 text-white rounded h-40 overflow-auto">
        {formatDebugOutput(debuggedCode)}
      </pre>
    </div>
  );
}
