import React, { useState } from "react";

function OutputPanel() {
  const [output, setOutput] = useState("");

  return (
    <div className="w-1/4 p-4 bg-gray-200">
      <h3 className="font-bold">Execution Output</h3>
      <textarea
        className="w-full p-2 border"
        rows="5"
        value={output}
        readOnly
      />
    </div>
  );
}

export default OutputPanel;
