# Autocode: Intelligent IDE  
AI-Powered Developer Productivity Tool

## Overview

**Intelligent IDE (AutoCode)** is an **AI-driven development platform** designed to **accelerate software development** by automating key processes such as **code generation,advanced debugging capabilities, test case execution, custom input and output execution**. It leverages AI model to transform problem statements into **fully functional, automated, optimized code** while providing real-time debugging and validation.


## Table of Contents
1. Key Features
2. Tech Stack
3. Dependencies
4. Installation and Setup
5. Run the Project
6. API Endpoints
7. Demo Preview

   
## Key Features

1. **AI-Powered Code Generation** – Convert problem statements into working code automatically.  
2. **Multi-Language Support** – Generate code in **JavaScript, Python, C++, and C**.  
3. **Smart Debugging** – AI detects and fixes syntax, semantic, coding errors automatically.  
4. **Automated Test Case Generation** – AI suggests relevant test cases based on input.  
5. **Real-Time Code Execution** – Run generated code with execution feedback.  
6. **Custom Test Cases** – Users can do custom input and verify test cases manually.  
7. **CI Pipeline Implemented** – Automated testing and validation on every code push.  

## Tech Stack 

### Frontend
1. React.js – Modern UI framework
2. Vite – Fast development environment
3. Tailwind CSS – Utility-first CSS framework
4. Monaco Editor – Powerful code editor
5. Zustand – State management
6. Axios – HTTP client for API requests

### Backend
1. Node.js – Server-side JavaScript runtime
2. Express.js – Web framework for Node.js
3. Google Gemini AI – AI-powered code generation
4. Tesseract.js – Optical Character Recognition (OCR)
5. Multer – File uploads (for image-based problem statements)
6. Axios – API handling
7. Cors – Cross-Origin Resource Sharing
8. Dotenv – Environment variable management

## Depenencies

### Frontend

`npm install @monaco-editor/react @shadcn/ui @tailwindcss/vite axios monaco-editor react react-dom tailwindcss zustand`

### Backend
`npm install @google/generative-ai axios child_process cors dotenv express fs multer nodemon tesseract.js`

## Installation and Setup

### 1. Clone the Repository

`git clone https://github.com/yourusername/AutoCoderX.git
cd AutoCoderX
`
### 2. Install Frontend Dependencies
`cd frontend
npm install
`
### 3. Install Backend Dependencies
`cd backend
npm install
`

### 4. Set Up Environment Variables
`PORT=5000
GEMINI_API_KEY=your_google_gemini_api_key
`

## Run the Project

### 1. Start Backend
`cd backend
nodemon server.js
`

Frontend runs on http://localhost:5173

### 2. Start Frontend
`cd frontend
npm run dev
`

Backend runs on http://localhost:5000


## API Endpoints

| Method | Endpoint           | Description                                      |
|--------|-------------------|--------------------------------------------------|
| POST   | `/api/code/generate`  | Generates code based on a problem statement.    |
| POST   | `/api/code/debug`     | Debugs the provided code.                      |
| POST   | `/api/code/execute`   | Executes the provided code with testcases.  |
| POST   | `/api/code/test`      | Tests the provided code with user input.    |

## Demo Preview

https://github.com/user-attachments/assets/4e9d2c23-76a0-4ec1-840e-d32fb258b10d


