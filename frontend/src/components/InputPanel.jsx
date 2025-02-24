import React, { useState } from "react";
import axios from "axios";

function InputPanel() {
  const [problem, setProblem] = useState("");
  const [image, setImage] = useState(null);

  const generateCode = async () => {
    const response = await axios.post("http://localhost:5000/generate-code", {
      prompt: problem,
    });
    console.log("Generated Code:", response.data.code);
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    setImage(file);

    const formData = new FormData();
    formData.append("image", file);

    const response = await axios.post(
      "http://localhost:5000/upload-image",
      formData
    );
    setProblem(response.data.text);
  };

  return (
    <div className="w-1/4 p-4 bg-gray-100">
      <textarea
        className="w-full p-2 border"
        rows="5"
        value={problem}
        onChange={(e) => setProblem(e.target.value)}
      />
      <input type="file" className="mt-2" onChange={handleImageUpload} />
      <button
        className="w-full p-2 mt-2 bg-blue-500 text-white"
        onClick={generateCode}
      >
        Generate Code
      </button>
    </div>
  );
}

export default InputPanel;
