import runCodeInSandbox from "../utils/sandbox.js";

const executeCodeService = (language, code, callback) => {
  runCodeInSandbox(language, code, (result) => {
    callback(result);
  });
};

export default executeCodeService;
