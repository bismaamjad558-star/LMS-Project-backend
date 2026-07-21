import User from "../models/User.js";
import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";

export const adminDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalCourses = await Course.countDocuments();
    const totalEnrollments = await Enrollment.countDocuments();

    res.status(200).json({
      success: true,
      dashboard: {
        totalUsers,
        totalCourses,
        totalEnrollments,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const instructorDashboard = async (req, res) => {
  try {
    const myCourses = await Course.find({
      instructor: req.user._id,
    });

    const totalCourses = myCourses.length;

    let totalStudents = 0;

    myCourses.forEach((course) => {
      totalStudents += course.studentsEnrolled.length;
    });

    res.status(200).json({
      success: true,
      dashboard: {
        totalCourses,
        totalStudents,
        myCourses,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const studentDashboard = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({
      student: req.user._id,
    }).populate("course");

    const totalCourses = enrollments.length;

    const averageProgress =
      totalCourses > 0
        ? enrollments.reduce((sum, item) => sum + item.progress, 0) /
          totalCourses
        : 0;

    res.status(200).json({
      success: true,
      dashboard: {
        totalCourses,
        averageProgress,
        enrollments,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};