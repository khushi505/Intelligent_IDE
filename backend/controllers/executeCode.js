import executeCodeService from "../services/executeCode.js";

const executeCode = (req, res) => {
  const { language, code } = req.body;

  if (!language || !code) {
    return res.status(400).json({ error: "Language and code are required!" });
  }

  executeCodeService(language, code, (result) => {
    if (result.success) {
      res.json({ output: result.output });
    } else {
      res.status(500).json({ error: result.error });
    }
  });
};

export default executeCode;
