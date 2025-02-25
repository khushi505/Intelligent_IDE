import axios from "axios";
import { useState } from "react";

export default function OutputPanel({ code, language, expectedOutput }) {
  const [actualOutput, setActualOutput] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleExecuteCode = async () => {
    if (!code.trim()) {
      alert("Please generate or enter code first!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/code/execute",
        { language, code }
      );

      setActualOutput(response.data.output);

      setStatus(
        response.data.output.trim() === expectedOutput.trim()
          ? "✅ Correct Output"
          : "❌ Incorrect Output"
      );
    } catch (error) {
      console.error("Error executing code:", error);
      setStatus("⚠️ Execution Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleExecuteCode}
        className="bg-green-500 p-2 rounded mt-2"
        disabled={loading}
      >
        {loading ? "Running..." : "Run Code"}
      </button>

      <textarea
        className="w-full p-2 bg-gray-800 text-white border rounded mt-2"
        rows="2"
        placeholder="Your Output..."
        value={actualOutput}
        readOnly
      ></textarea>

      <div className="mt-2 font-bold">{status}</div>
    </div>
  );
}
