import express from "express";
import debugCode from "../controllers/debugCode.js";

const router = express.Router();

router.post("/debug", debugCode);

export default router;
