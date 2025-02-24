const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const generateCode = require("./routes/generateCode");
const debugCode = require("./routes/debugCode");
const executeCode = require("./routes/executeCode");
const generateTests = require("./routes/generateTests");
const ocr = require("./utils/ocr");

app.use("/generate-code", generateCode);
app.use("/debug-code", debugCode);
app.use("/execute-code", executeCode);
app.use("/generate-tests", generateTests);
app.use("/upload-image", ocr);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
