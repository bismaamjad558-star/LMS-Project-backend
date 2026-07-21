import express from "express";
import { adminDashboard, instructorDashboard, studentDashboard, } from "../controllers/dashboardController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/admin", protect, adminDashboard);
router.get("/instructor", protect, instructorDashboard);
router.get("/student", protect, studentDashboard);


export default router;