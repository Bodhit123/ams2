const runQuery = require("../../Utils/dbUtils");

exports.getAllStudents = async () => {
  const sql =
    "SELECT tblstudents.Id, tblclass.className, tblclassarms.classArmName, tblclassarms.Id AS classArmId, tblstudents.firstName, tblstudents.lastName, tblstudents.otherName, tblstudents.admissionNumber, tblstudents.dateCreated FROM tblstudents INNER JOIN tblclass ON tblclass.Id = tblstudents.classId INNER JOIN tblclassarms ON tblclassarms.Id = tblstudents.classArmId";
  return await runQuery(sql, []);
};

exports.createStudent = async (studentData) => {
  const checkExistingQuery =
    "SELECT * FROM tblstudents WHERE admissionNumber = ?";
  try {
    const results = await runQuery(checkExistingQuery, [
      studentData.admissionNumber,
    ]);
    if (results.length > 0) {
      return "This Email Address Already Exists!";
    } else {
      const insertQuery =
        "INSERT INTO tblstudents (firstName, lastName, otherName, admissionNumber, password, classId, classArmId, dateCreated) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
      await runQuery(insertQuery, [
        studentData.firstName,
        studentData.lastName,
        studentData.otherName,
        studentData.admissionNumber,
        studentData.password,
        studentData.classId,
        studentData.classArmId,
        studentData.dateCreated,
      ]);
      return "Student created successfully";
    }
  } catch (error) {
    throw error.sqlMessage;
  }
};

exports.updateStudentDetails = async (studentID, studentData) => {
  const updateQuery =
    "UPDATE tblstudents SET firstName=?, lastName=?, otherName=?, admissionNumber=?, password=?, classId=?, classArmId=?, dateCreated=? WHERE Id=?";
  try {
    const updateResult = await runQuery(updateQuery, [
      studentData.firstName,
      studentData.lastName,
      studentData.otherName,
      studentData.admissionNumber,
      studentData.password,
      studentData.classId,
      studentData.classArmId,
      studentData.dateCreated,
      studentID,
    ]);
    if (updateResult.affectedRows > 0) {
      return { success: true, message: "Student updated successfully" };
    } else {
      return { success: false, message: "Student not found or not updated" };
    }
  } catch (error) {
    throw error.sqlMessage;
  }
};

exports.deleteStudent = async (studentID) => {
  const deleteQuery = "DELETE FROM tblstudents WHERE Id=?";
  try {
    const result = await runQuery(deleteQuery, [studentID]);

    if (deleteResult.affectedRows > 0) {
      return { success: true, message: "Student deleted successfully" };
    } else {
      return { success: false, message: "Student not found or not deleted" };
    }
  } catch (error) {
    throw new Error(`Error deleting student: ${error.message}`);
  }
};

// const { db } = require('../config/database');

// const runQuery = (sql, params, callback) => {
//   db.query(sql, params, (err, results) => {
//     callback(err, results);
//   });
// };

// exports.getAllStudents = (callback) => {
//   const sql =
//     "SELECT tblstudents.Id, tblclass.className, tblclassarms.classArmName, tblclassarms.Id AS classArmId, tblstudents.firstName, tblstudents.lastName, tblstudents.otherName, tblstudents.admissionNumber, tblstudents.dateCreated FROM tblstudents INNER JOIN tblclass ON tblclass.Id = tblstudents.classId INNER JOIN tblclassarms ON tblclassarms.Id = tblstudents.classArmId";
//   runQuery(sql, [], callback);
// };

// exports.createStudent = (studentData, callback) => {
//   const checkExistingQuery = 'SELECT * FROM tblstudents WHERE admissionNumber = ?';
//   runQuery(checkExistingQuery, [studentData.admissionNumber], (err, results) => {
//     if (err) {
//       callback(err, null);
//     } else if (results.length > 0) {
//       callback(null, 'This Email Address Already Exists!');
//     } else {
//       const insertQuery =
//         'INSERT INTO tblstudents (firstName, lastName, otherName, admissionNumber, password, classId, classArmId, dateCreated) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
//       runQuery(
//         insertQuery,
//         [
//           studentData.firstName,
//           studentData.lastName,
//           studentData.otherName,
//           studentData.admissionNumber,
//           studentData.password,
//           studentData.classId,
//           studentData.classArmId,
//           studentData.dateCreated,
//         ],
//         (err, results) => {
//           if (err) {
//             callback(err,null);
//           } else {
//             callback(null, "Student created successfully");
//           }
//         }
//       );
//     }
//   });
// };

// exports.updateStudentDetails = (studentID, studentData, callback) => {
//   const updateQuery =
//     'UPDATE tblstudents SET firstName=?, lastName=?, otherName=?, admissionNumber=?, password=?, classId=?, classArmId=?, dateCreated=? WHERE Id=?';
//   runQuery(
//     updateQuery,
//     [
//       studentData.firstName,
//       studentData.lastName,
//       studentData.otherName,
//       studentData.admissionNumber,
//       studentData.password,
//       studentData.classId,
//       studentData.classArmId,
//       studentData.dateCreated,
//       studentID,
//     ],
//     (err) => {
//       if (err) {
//         callback(err, null);
//       } else {
//         callback(null, 'Student updated successfully');
//       }
//     }
//   );
// };

// exports.deleteStudent = (studentID, callback) => {
//   const deleteQuery = "DELETE FROM tblstudents WHERE Id=?";
//   runQuery(deleteQuery, [studentID], (err) => {
//     if (err) {
//       callback(err, null);
//     } else {
//       callback(null, "Student deleted successfully");
//     }
//   });
// };
