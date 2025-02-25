import axios from "axios";

export default function CodeEditor({ code, setCode }) {
  const handleGenerateCode = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/code/generate",
        { prompt: code }
      );
      setCode(response.data.code.replace(/```[a-z]*\n?|```/g, "").trim());
    } catch (error) {
      console.error("Error generating code:", error);
    }
  };

  return (
    <div>
      <textarea
        className="w-full p-2 bg-gray-800 text-white border rounded"
        rows="5"
        placeholder="Write your code here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
      ></textarea>
      {/* <button
        onClick={handleGenerateCode}
        className="bg-blue-500 p-2 rounded mt-2"
      >
        Generate Code
      </button> */}
    </div>
  );
}
