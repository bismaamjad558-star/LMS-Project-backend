import express from "express";
import {
  enrollCourse,
  getEnrolledCourses,
  removeEnrollment,
  updateProgress,
} from "../controllers/enrollmentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/enroll", protect, enrollCourse);
router.get("/my-courses", protect, getEnrolledCourses);
router.delete("/:id", protect, removeEnrollment);
router.put("/:id/progress", protect, updateProgress);

export default router;