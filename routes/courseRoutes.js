import express from "express";
import upload from "../middleware/uploadMiddleware.js";

import {
  createCourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController.js";

import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public Routes
router.get("/", getAllCourses);
router.get("/:id", getSingleCourse);

// Protected Routes
router.post(
  "/",
  protect,
  authorize("instructor", "admin"),
  upload.single("thumbnail"),
  createCourse
);

router.put(
  "/:id",
  protect,
  authorize("instructor", "admin"),
  updateCourse
);

router.delete(
  "/:id",
  protect,
  authorize("instructor", "admin"),
  deleteCourse
);

export default router;