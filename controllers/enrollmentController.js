import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";


// Enroll in Course
export const enrollCourse = async (req, res) => {
  try {

    const { courseId } = req.body;


    const course = await Course.findById(courseId);


    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }


    const alreadyEnrolled = await Enrollment.findOne({
      student: req.user._id,
      course: courseId,
    });


    if (alreadyEnrolled) {
      return res.status(400).json({
        success: false,
        message: "Already enrolled in this course",
      });
    }


    const enrollment = await Enrollment.create({
      student: req.user._id,
      course: courseId,
    });


    res.status(201).json({
      success: true,
      message: "Course Enrolled Successfully",
      enrollment,
    });


  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};




// View Enrolled Courses
export const getEnrolledCourses = async (req, res) => {

  try {


    const enrollments = await Enrollment.find({
      student: req.user._id,
    })
    .populate("course")
    .populate("student", "name email");


    res.status(200).json({

      success: true,
      count: enrollments.length,
      enrollments,

    });


  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};




// Remove Enrollment
export const removeEnrollment = async (req, res) => {

  try {


    const enrollment = await Enrollment.findById(
      req.params.id
    );


    if (!enrollment) {

      return res.status(404).json({

        success: false,
        message: "Enrollment not found",

      });

    }


    await enrollment.deleteOne();


    res.status(200).json({

      success: true,
      message: "Enrollment Removed Successfully",

    });


  } catch (error) {

    res.status(500).json({

      success: false,
      message: error.message,

    });

  }

};




// Update Course Progress
export const updateProgress = async (req, res) => {

  try {


    const { progress } = req.body;


    const enrollment = await Enrollment.findById(
      req.params.id
    );


    if (!enrollment) {

      return res.status(404).json({

        success: false,
        message: "Enrollment not found",

      });

    }


    enrollment.progress = progress;


    await enrollment.save();


    res.status(200).json({

      success: true,
      message: "Progress Updated Successfully",
      enrollment,

    });


  } catch (error) {


    res.status(500).json({

      success: false,
      message: error.message,

    });


  }

};