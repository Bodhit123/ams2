const runQuery = require("../Utils/dbUtils");

exports.getAllSubjects = async (classId) => {
  const sql = "SELECT * FROM tblsubjects WHERE classId = ? ";
  return await runQuery(sql, [classId]);
};

exports.getall = async () => {
  const sql = "SELECT * FROM tblattendance";
  return await runQuery(sql, []);
};

exports.viewClassAttendance = async (data) => {
  const { classId, classArmId, subjectId, dateTaken } = data;
  console.log(data);
  const sql =
    "SELECT tblattendance.Id,tblstudents.firstName,tblstudents.lastName,tblstudents.otherName,tblstudents.admissionNumber,tblclass.className,tblclassarms.classArmName,tblsessionterm.sessionName,tblsessionterm.termId,tblterm.termName,tblattendance.status,tblattendance.dateTimeTaken FROM tblattendance INNER JOIN tblstudents ON tblattendance.admissionNo = tblstudents.admissionNumber INNER JOIN tblclass ON tblattendance.classId = tblclass.Id INNER JOIN tblclassarms ON tblattendance.classArmId = tblclassarms.Id INNER JOIN tblsessionterm ON tblattendance.sessionTermId = tblsessionterm.Id  INNER JOIN tblterm ON tblterm.Id = tblsessionterm.termId where  tblattendance.classId = ? and tblattendance.classArmId = ? and tblattendance.subjectId = ? and tblattendance.dateTimeTaken = ?";
  return await runQuery(sql, [classId, classArmId, subjectId, dateTaken]);
};

exports.viewStudentAttendance = async (data) => {
  console.log(data.singleDate);
  const { type, admissionNumber, classId, classArmId, subjectId } = data;
  if (type === "2") {
    const singleDate = data.singleDate;
    const sql = `SELECT
      tblattendance.Id,
      tblattendance.status,
      tblattendance.dateTimeTaken,
      tblclass.className,
      tblclassarms.classArmName,
      tblsessionterm.sessionName,
      tblsessionterm.termId,
      tblterm.termName,
      tblstudents.firstName,
      tblstudents.lastName,
      tblstudents.otherName,
      tblstudents.admissionNumber
    FROM
      tblattendance
    INNER JOIN
      tblclass ON tblclass.Id = tblattendance.classId
    INNER JOIN
      tblclassarms ON tblclassarms.Id = tblattendance.classArmId
    INNER JOIN
      tblsessionterm ON tblsessionterm.Id = tblattendance.sessionTermId
    INNER JOIN
      tblterm ON tblterm.Id = tblsessionterm.termId
    INNER JOIN
      tblstudents ON tblstudents.admissionNumber = tblattendance.admissionNo
    WHERE
      tblattendance.dateTimeTaken = ? 
      AND tblattendance.admissionNo = ?
      AND tblattendance.classId = ?
      AND tblattendance.classArmId = ?
      AND tblattendance.subjectId = ?;`;

    return await runQuery(sql, [
      singleDate,
      admissionNumber,
      classId,
      classArmId,
      subjectId,
    ]);
  } else if (type === "3") {
    console.log(data.toDate, data.fromDate);
    const { from, to } = data;
    const sql = `SELECT
      tblattendance.Id,
      tblattendance.status,
      tblattendance.dateTimeTaken,
      tblclass.className,
      tblclassarms.classArmName,
      tblsessionterm.sessionName,
      tblsessionterm.termId,
      tblterm.termName,
      tblstudents.firstName,
      tblstudents.lastName,
      tblstudents.otherName,
      tblstudents.admissionNumber
    FROM
      tblattendance
    INNER JOIN
      tblclass ON tblclass.Id = tblattendance.classId
    INNER JOIN
      tblclassarms ON tblclassarms.Id = tblattendance.classArmId
    INNER JOIN
      tblsessionterm ON tblsessionterm.Id = tblattendance.sessionTermId
    INNER JOIN
      tblterm ON tblterm.Id = tblsessionterm.termId
    INNER JOIN
      tblstudents ON tblstudents.admissionNumber = tblattendance.admissionNo
    WHERE
      tblattendance.dateTimeTaken BETWEEN ? AND ? 
      AND tblattendance.admissionNo = ?
      AND tblattendance.classId = ?
      AND tblattendance.classArmId = ?
      AND tblattendance.subjectId = ?`;
    return await runQuery(sql, [
      from,
      to,
      admissionNumber,
      classId,
      classArmId,
      subjectId,
    ]);
  } else if (type === "1") {
    const sql = `SELECT
      tblattendance.Id,
      tblattendance.status,
      tblattendance.dateTimeTaken,
      tblclass.className,
      tblclassarms.classArmName,
      tblsessionterm.sessionName,
      tblsessionterm.termId,
      tblterm.termName,
      tblstudents.firstName,
      tblstudents.lastName,
      tblstudents.otherName,
      tblstudents.admissionNumber
    FROM
      tblattendance
    INNER JOIN
      tblclass ON tblclass.Id = tblattendance.classId
    INNER JOIN
      tblclassarms ON tblclassarms.Id = tblattendance.classArmId
    INNER JOIN
      tblsessionterm ON tblsessionterm.Id = tblattendance.sessionTermId
    INNER JOIN
      tblterm ON tblterm.Id = tblsessionterm.termId
    INNER JOIN
      tblstudents ON tblstudents.admissionNumber = tblattendance.admissionNo
    WHERE
      tblattendance.admissionNo = ?
      AND tblattendance.classId = ?
      AND tblattendance.classArmId = ?
      AND tblattendance.subjectId = ?;`;

    return await runQuery(sql, [
      admissionNumber,
      classId,
      classArmId,
      subjectId,
    ]);
  }
};

exports.fetchStudents = async (Data) => {
  const { classId, classArmId } = Data;
  const sql = `SELECT
      tblclass.className,
      tblclassarms.classArmName,
      tblstudents.Id,
      tblstudents.firstName,
      tblstudents.lastName,
      tblstudents.otherName,
      tblstudents.admissionNumber
    FROM
      tblclassteacher
    INNER JOIN
      tblclass ON tblclassteacher.classId = tblclass.Id
    INNER JOIN
      tblclassarms ON tblclassteacher.classArmId = tblclassarms.Id
    INNER JOIN
      tblstudents ON tblclassteacher.classId = tblstudents.classId AND tblclassteacher.classArmId = tblstudents.classArmId
    WHERE
      tblclass.Id = ?
      AND tblclassarms.Id = ?;
    `;
  return await runQuery(sql, [classId, classArmId]);
};

//check if already record exist and add the list of students of class into tblattendance before taking attandance with status 0
exports.addStudents = async (studentData) => {
  const sessionTermResults = await runQuery(
    "select Id from tblsessionterm where isActive ='1'",
    []
  );
  const sessionTermId =
    sessionTermResults.length > 0 ? sessionTermResults[0].Id : null;

  const { classId, classArmId, subjectId, dateTaken, timeTaken } = studentData;
  const status = "0";
  const checkQuery =
    "select * from tblattendance  where classId = ? and classArmId = ? and subjectId = ? and dateTimeTaken = ? and TimeTaken = ? ";

  try {
    const results = await runQuery(checkQuery, [
      classId,
      classArmId,
      subjectId,
      dateTaken,
      timeTaken,
    ]);

    //if Record does not exist, insert the new record
    if (results.length === 0) {
      const insertStudents = await runQuery(
        "select * from tblstudents  where classId = ? and classArmId = ?",
        [classId, classArmId]
      );

      //insert the students record into the attendance table
      try {
        // don't use for each loop here it wont work correctly here
        for (const student of insertStudents)
          await runQuery(
            "insert into tblattendance (admissionNo,classId,classArmId,sessionTermId,status,dateTimeTaken,subjectId,timeTaken) values (?,?,?,?,?,?,?,?) ",
            [
              student.admissionNumber,
              classId,
              classArmId,
              sessionTermId,
              status,
              dateTaken,
              subjectId,
              timeTaken,
            ]
          );
      } catch (err) {
        throw err;
      }
    }
  } catch (err) {
    throw err;
  }
};

//check if attendance already taken for given subject and date time and add the attendance data (status-present or absent) into table if not
exports.takeAttendance = async (studentData, attendance) => {
  const { classId, classArmId, subjectId, dateTaken, timeTaken } = studentData;
  try {
    // Check if the attendance has been taken for the given date and class
    const attendanceCheckQuery = `
        SELECT * FROM tblattendance
        WHERE classId = ? AND classArmId = ?  AND subjectId = ? AND dateTimeTaken = ? AND TimeTaken = ? AND status = '1'
      `;
    const attendanceCheckResults = await runQuery(attendanceCheckQuery, [
      classId,
      classArmId,
      subjectId,
      dateTaken,
      timeTaken,
    ]);

    if (attendanceCheckResults.length > 0) {
      return {
        success: false,
        message: "Attendance has been taken for today!",
      };
    }

    // Update the status for the specified admission numbers
    for (const student of attendance) {
      const statusToUpdate = student.status ? 1 : 0;

      const updateQuery = `
          UPDATE tblattendance
          SET status = ?
          WHERE admissionNo = ? AND classId = ? AND classArmId = ? AND subjectId = ? AND dateTimeTaken = ? AND TimeTaken = ?  
        `;
      const updateResult = await runQuery(updateQuery, [
        statusToUpdate,
        student.adNo,
        classId,
        classArmId,
        subjectId,
        dateTaken,
        timeTaken,
      ]);

      if (!updateResult) {
        return {
          success: false,
          message: "An error occurred while updating attendance!",
        };
      }
    }

    return { success: true, message: "Attendance taken successfully!" };
  } catch (error) {
    console.error("Error in takeAttendance:", error);
    return { success: false, message: "Internal Server Error" };
  }
};
