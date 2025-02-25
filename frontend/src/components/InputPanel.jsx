import { useState } from "react";
import axios from "axios";

export default function InputPanel({
  setCode,
  setExpectedOutput,
  setLanguage,
}) {
  const [input, setInput] = useState("");
  const [expectedOutput, setLocalExpectedOutput] = useState("");
  const [language, setLocalLanguage] = useState("javascript"); // Default language
  const [loading, setLoading] = useState(false);

  const handleGenerateCode = async () => {
    if (!input.trim()) {
      alert("Please enter a problem statement!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/code/generate",
        {
          prompt: input,
          language: language, // Send selected language to backend
        }
      );

      setCode(response.data.code);
    } catch (error) {
      console.error("Error generating code:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Language Selection Dropdown */}
      <select
        className="w-full p-2 mb-2 border bg-gray-800 text-white rounded"
        value={language}
        onChange={(e) => {
          setLocalLanguage(e.target.value);
          setLanguage(e.target.value);
        }}
      >
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="cpp">C++</option>
        <option value="c">C</option>
      </select>

      {/* Problem Statement Input */}
      <textarea
        className="w-full p-2 bg-gray-800 text-white border rounded"
        rows="3"
        placeholder="Enter problem statement..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>

      {/* Expected Output Input */}
      {/* <textarea
        className="w-full p-2 bg-gray-800 text-white border rounded mt-2"
        rows="1"
        placeholder="Expected Output..."
        value={expectedOutput}
        onChange={(e) => setLocalExpectedOutput(e.target.value)}
      ></textarea> */}

      {/* Buttons for Setting Expected Output & Generating Code */}
      {/* <button
        onClick={() => setExpectedOutput(expectedOutput)}
        className="bg-blue-500 p-2 rounded mt-2"
      >
        Set Expected Output
      </button> */}

      <button
        onClick={handleGenerateCode}
        className="bg-blue-500 p-2 rounded mt-2 ml-2"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Code"}
      </button>
    </div>
  );
}
