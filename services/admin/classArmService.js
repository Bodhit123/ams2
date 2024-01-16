const runQuery = require("../../Utils/dbUtils");

exports.getAllArms = async () => {
  const sql = "SELECT * FROM tblclassarms";
  return await runQuery(sql, []);
};

exports.getExistingArms_By_division = async () => {
  const sql = `SELECT tblclassarms.Id,tblclassarms.isAssigned,tblclass.className,tblclassarms.classArmName 
  FROM tblclassarms
  INNER JOIN tblclass ON tblclass.Id = tblclassarms.classId`;
  return await runQuery(sql, []);
};

exports.getById = async (Id) => {
  const sql = "SELECT * FROM tblclassarms where Id = ?";
  return await runQuery(sql, []);
};

exports.createArm = async (classId, classArmName) => {
  const isAssigned = "0";
  try {
    const checkExistingQuery =
      "SELECT * FROM tblclassarms WHERE classArmName = ? AND classId = ?";
    const results = await runQuery(checkExistingQuery, [classArmName, classId]);

    if (results.length > 0) {
      return "This ClassArm Already Exists!";
    } else {
      const insertQuery =
        "INSERT INTO tblclassarms (classId, classArmName, isAssigned) VALUES (?, ?, ?)";
      await runQuery(insertQuery, [classId, classArmName, isAssigned]);
      return "ClassArm created successfully";
    }
  } catch (error) {
    throw error.sqlMessage;
  }
};

exports.updateClassArmDetails = async (armID, classID, classArmName) => {
  try {
    const updateQuery =
      "UPDATE tblclassarms SET classId=?, classArmName=? WHERE Id=?";
    const updateResult = await runQuery(updateQuery, [
      classID,
      classArmName,
      armID,
    ]);

    if (updateResult.affectedRows > 0) {
      return { success: true, message: "ClassArm updated successfully" };
    } else {
      return { success: false, message: "ClassArm not found or not updated" };
    }
  } catch (error) {
    throw error.sqlMessage;
  }
};

exports.deleteClassArm = async (armID) => {
  try {
    const deleteQuery = "DELETE FROM tblclassarms WHERE Id=?";
    const deleteResult = await runQuery(deleteQuery, [armID]);

    if (deleteResult.affectedRows > 0) {
      return { success: true, message: "ClassArm deleted successfully" };
    } else {
      return { success: false, message: "ClassArm not found or not deleted" };
    }
  } catch (error) {
    throw new Error(`Error deleting classArm: ${error.message}`);
  }
};
