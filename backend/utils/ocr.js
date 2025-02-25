import Tesseract from "tesseract.js";

// Function to extract text from an uploaded image
export async function extractTextFromImage(imageFile) {
  try {
    // Run OCR using Tesseract.js
    const {
      data: { text },
    } = await Tesseract.recognize(
      imageFile, // Image file
      "eng", // Language: English
      {
        logger: (m) => console.log(m), // Log progress (optional)
      }
    );

    console.log("Extracted Text:", text);
    return text.trim(); // Return extracted text after trimming
  } catch (error) {
    console.error("Error extracting text:", error);
    return ""; // Return empty string in case of error
  }
}

// Function to send the extracted text to the AI model
export async function getSolutionFromAI(problemStatement) {
  try {
    const response = await fetch("/api/solve", {
      // Replace with your AI API endpoint
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ problem: problemStatement }),
    });

    const data = await response.json();
    return data.solution; // Return the AI-generated solution
  } catch (error) {
    console.error("Error fetching solution:", error);
    return "Error generating solution";
  }
}

// Main function to handle image upload and solution generation
export async function processImageAndSolve(imageFile) {
  const problemStatement = await extractTextFromImage(imageFile);
  if (!problemStatement)
    return "No text detected. Try again with a clearer image.";

  const solution = await getSolutionFromAI(problemStatement);
  return solution;
}
