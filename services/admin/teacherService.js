const runQuery = require("../../Utils/dbUtils");

exports.getAllTeachers = async () => {
  const sql = `SELECT 
  tblclassteacher.Id,
  tblclass.className,
  tblclassarms.classArmName,
  tblclassarms.Id AS classArmId,
  tblclassteacher.firstName,
  tblclassteacher.lastName,
  tblclassteacher.emailAddress,
  tblclassteacher.phoneNo,
  tblclassteacher.dateCreated
FROM 
  tblclassteacher
INNER JOIN 
  tblclass ON tblclass.Id = tblclassteacher.classId
INNER JOIN 
  tblclassarms ON tblclassarms.Id = tblclassteacher.classArmId`;

  return await runQuery(sql, []);
};



exports.createTeacher = async (teacherData) => {
  const checkExistingQuery =
    "SELECT * FROM tblclassteacher WHERE emailAddress = ?";
  try {
    const results = await runQuery(checkExistingQuery, [
      teacherData.emailAddress,
    ]);
    if (results.length > 0) {
      return "This Email Address Already Exists!";
    } else {
      const insertQuery =
        "INSERT INTO tblclassteacher (firstName, lastName, emailAddress, password, phoneNo, classId, classArmId, dateCreated, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
      const result = await runQuery(insertQuery, [
        teacherData.firstName,
        teacherData.lastName,
        teacherData.emailAddress,
        teacherData.password,
        teacherData.phoneNo,
        teacherData.classId,
        teacherData.classArmId,
        teacherData.dateCreated, // Use the current date or format as needed
        teacherData.role || 'teacher', // Use the provided role or default to 'teacher'
      ]);
      if (result) {
        const query = await runQuery(
          "UPDATE tblclassarms SET isAssigned = '1' WHERE Id = ?",
          [teacherData.classArmId]
        );
        if (query) {
          return "Teacher created successfully";
        } else {
          return "An error occurred.";
        }
      }
    }
  } catch (error) {
    throw error.sqlMessage;
  }
};


exports.deleteTeacher = async (teacherID,armId) => {
  const deleteQuery = "DELETE FROM tblclassteacher WHERE Id=?";
  try {
    const deleteResult = await runQuery(deleteQuery, [teacherID]);

    if (deleteResult.affectedRows > 0) {
      // Perform the second query to update tblclassarms
      const updateQuery = "UPDATE tblclassarms SET isAssigned='0' WHERE Id=?";
      const updateResult = await runQuery(updateQuery, [teacherID]);

      if (updateResult.affectedRows > 0) {
        return { success: true, message: "Teacher deleted successfully" };
      } else {
        return { success: false, message: "Error updating tblclassarms" };
      }
    } else {
      return { success: false, message: "Teacher not found or not deleted" };
    }
  } catch (error) {
    throw new Error(`Error deleting teacher: ${error.message}`);
  }
};
