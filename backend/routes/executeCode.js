// const express = require("express");
// const { exec } = require("child_process");
// const fs = require("fs");
// const router = express.Router();

// router.post("/", (req, res) => {
//   const { code, language } = req.body;
//   const filename = `temp.${language === "python" ? "py" : "js"}`;

//   fs.writeFileSync(filename, code);

//   exec(
//     language === "python" ? `python ${filename}` : `node ${filename}`,
//     (error, stdout, stderr) => {
//       if (error || stderr) {
//         res.json({ success: false, error: stderr || error.message });
//       } else {
//         res.json({ success: true, output: stdout });
//       }
//       fs.unlinkSync(filename);
//     }
//   );
// });

// module.exports = router;
