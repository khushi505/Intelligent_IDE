import debugWithGemini from "../services/debugCode.js";

const debugCode = async (req, res) => {
  try {
    const { code } = req.body;
    const debuggedCode = await debugWithGemini(code);
    res.json({ debugged_code: debuggedCode });
  } catch (error) {
    res.status(500).json({ error: "Error debugging code" });
  }
};

export default debugCode;
