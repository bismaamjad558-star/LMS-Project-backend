import Course from "../models/Course.js";

// Create Course
export const createCourse = async (req, res) => {
  try {
    const { title, description, category, price } = req.body;

    const course = await Course.create({
      title,
      description,
      category,
      price,
      instructor: req.user._id,
      thumbnail:req.file ?
      req.file.filename :"",
    });

    res.status(201).json({
      success: true,
      message: "Course Created Successfully",
      course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Get All Courses
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate(
      "instructor",
      "name email role"
    );

    res.status(200).json({
      success: true,
      count: courses.length,
      courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Get Single Course
export const getSingleCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate(
      "instructor",
      "name email role"
    );

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Update Course
export const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Course Updated Successfully",
      course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Delete Course
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    await course.deleteOne();

    res.status(200).json({
      success: true,
      message: "Course Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};