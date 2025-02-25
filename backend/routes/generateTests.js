import express from "express";
import generateTests from "../controllers/generateTests.js";

const router = express.Router();

router.post("/test", generateTests);

export default router;
