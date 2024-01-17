const runQuery = require("../../Utils/dbUtils"); 

exports.getAllClasses = async () => {
  const sql = 'SELECT * FROM tblclass ';
  return await runQuery(sql, []);
};

exports.getAllClassesASC = async () => {
  const sql = 'SELECT * FROM tblclass ORDER BY className ASC ';
  return await runQuery(sql, []);
};

exports.getallArmsByClass = async (id) => {
  const sql = "SELECT * FROM tblclassarms where classId = ?";
  return await runQuery(sql, [id]);
};

exports.createClass = async (className) => {
  const checkExistingQuery = 'SELECT * FROM tblclass WHERE className = ?';
  const results = await runQuery(checkExistingQuery, [className]);

  if (results.length > 0) {
    return 'This ClassName Already Exists!';
  } else {
    const insertQuery = 'INSERT INTO tblclass (className) VALUES (?)';
    await runQuery(insertQuery, [className]);
    return 'Class created successfully';
  }
};

exports.updateClassDetails = async (classID, className) => {
  const updateQuery = 'UPDATE tblclass SET className=? WHERE Id=?';
  await runQuery(updateQuery, [className, classID]);
  return 'Class updated successfully';
};

exports.deleteClass = async (classID) => {
  const deleteQuery = 'DELETE FROM tblclass WHERE Id=?';
  await runQuery(deleteQuery, [classID]);
  return 'Class deleted successfully';
};
