import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get the current file directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const runCodeInSandbox = (language, code, callback) => {
  const tempFilePath = path.join(
    __dirname,
    `temp_code.${getFileExtension(language)}`
  );

  // Write the code to a temporary file
  fs.writeFileSync(tempFilePath, code);

  // Determine the execution command
  let executionCommand;
  switch (language) {
    case "javascript":
      executionCommand = `node ${tempFilePath}`;
      break;
    case "python":
      executionCommand = `python3 ${tempFilePath}`;
      break;
    case "cpp":
      executionCommand = `g++ ${tempFilePath} -o temp && ./temp`;
      break;
    case "c":
      executionCommand = `gcc ${tempFilePath} -o temp && ./temp`;
      break;
    default:
      callback({ success: false, error: "Unsupported language!" });
      return;
  }

  // Execute the command
  exec(executionCommand, { timeout: 5000 }, (error, stdout, stderr) => {
    fs.unlinkSync(tempFilePath); // Delete temp file after execution

    if (error) {
      callback({ success: false, error: stderr || error.message });
    } else {
      callback({ success: true, output: stdout });
    }
  });
};

// Function to determine file extension
const getFileExtension = (language) => {
  switch (language) {
    case "javascript":
      return "js";
    case "python":
      return "py";
    case "cpp":
      return "cpp";
    case "c":
      return "c";
    default:
      return "";
  }
};

export default runCodeInSandbox;
