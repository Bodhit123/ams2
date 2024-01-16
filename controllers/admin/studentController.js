const {
    getAllStudents,
    createStudent,
    updateStudentDetails,
    deleteStudent,
  } = require("../../services/admin/studentService");

 
  exports.getAllStudentsController = async (req, res, next) => {
    try {
      const results = await getAllStudents();
      res.status(200).send(results);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  
  exports.createStudentController = async (req, res, next) => {
    const studentData = req.body;
  
    try {
      const result = await createStudent(studentData);
  
      if (result === "This Email Address Already Exists!") {
        // Handle the case where the student email already exists
        res.status(409).send(result); // 409 Conflict status code
      } else if (result === "Student created successfully") {
        // Student creation successful
        res.status(200).send(result);
      } else {
        // Unexpected response from the service
        res.status(500).send("Unexpected response from Service");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  };
  
  exports.updateStudentDetailsController = async (req, res, next) => {
    const studentID = req.params.id;
    try {
      const result = await updateStudentDetails(studentID, req.body);
      if (result.success) {
        // Update successful
        res.status(200).send(result);
      } else {
        // student not found or not updated
        res.status(404).send(result.message);
      }
    } catch (error) {
      res.status(404).send("Failed to update student");
    }
  };
  
  exports.deleteStudentController = async (req, res, next) => {
    const studentID = req.params.id;
    try {
      const message = await deleteStudent(studentID);

      if (message.success === true) {
        //successful deletion
        res.status(200).send(message);
      } else {
        //student not found or not deleted
        res.status(404).send(result.message);
      }
      res.status(200).send(message);
    } catch (error) {
      // Service threw an error
      res.status(500).send(error);
    }
  };
  

// const studentService = require('../services/studentService');

// Controller for getting all students
// exports.getAllStudentsController = (req, res, next) => {
//   const callback = (err, results) => {
//     if (err) {
//       res.status(500).send(err);
//     } else {
//       res.status(200).send(results);
//     }
//   };

//   studentService.getAllStudents(callback);
// };

// Controller for creating a student
// exports.createStudentController = (req, res, next) => {
//   const studentData = req.body;

//   const callback = (err, result) => {
//     if (err) {
//       res.status(500).send(err);
//     } else {
//       res.status(200).send(result);
//     }
//   };

//   studentService.createStudent(studentData, callback);
// };

// Controller for updating student details
// exports.updateStudentDetailsController = (req, res, next) => {
//   const studentID = req.params.id;
//   const studentData = req.body;

//   const callback = (err, result) => {
//     if (err) {
//       res.status(500).send(err);
//     } else {
//       res.status(200).send(result);
//     }
//   };

//   studentService.updateStudentDetails(studentID, studentData, callback);
// };

// Controller for deleting a student
// exports.deleteStudentController = (req, res, next) => {
//   const studentID = req.params.id;

//   const callback = (err, result) => {
//     if (err) {
//       res.status(500).send(err);
//     } else {
//       res.status(200).send(result);
//     }
//   };

//   studentService.deleteStudent(studentID, callback);
// };
