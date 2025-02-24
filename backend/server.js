import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import generateCode from "./routes/generateCode.js";
import debugCode from "./routes/debugCode.js";
import executeCode from "./routes/executeCode.js";
// import generateTests from "./routes/generateTests.js";
// import ocr from "./utils/ocr.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/code", generateCode);
app.use("/api/code", debugCode);
app.use("/api/code", executeCode);
// app.use("/generate-tests", generateTests);
// app.use("/upload-image", ocr);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
