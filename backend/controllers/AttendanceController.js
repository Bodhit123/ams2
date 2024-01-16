const attendanceService = require("../services/attendanceService");
const runQuery = require("../Utils/dbUtils");

exports.getTotalAttendance = async (req, res) => {
  try {
    const totalAttendanceOfClass = await runQuery(
      "select * from tblattendance where classId = ? and classArmId = ?",
      [req.params.class, req.params.arm]
    );
    res.status(200).send(totalAttendanceOfClass);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.subjectsByClassId = async (req, res, next) => {
  try {
    const subjectsInClass = await attendanceService.getAllSubjects(
      req.params.id
    );
    res.status(200).send(subjectsInClass);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getallAttendanceController = async (req, res, next) => {
  try {
    const results = await attendanceService.getall();
    res.status(200).send(results);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.classAttendanceController = async (req, res, next) => {
  try {
    const AttendanceResult = await attendanceService.viewClassAttendance(
      req.body
    );
    console.log(req.body);
    res.status(200).send(AttendanceResult);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

exports.studentAttendanceController = async (req, res, next) => {
  try {
    const AttendanceResult = await attendanceService.viewStudentAttendance(
      req.body
    );
    res.status(200).send(AttendanceResult);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

exports.fetchStudentsController = async (req, res, next) => {
  try {
    const results = await attendanceService.fetchStudents(req.body);
    res.status(200).send(results);
  } catch (error) {
    res.status(500).send(error);
  }
};

//check if already record exist and add the list of students of class into tblattendance before taking attandance with status 0
exports.addStudentsAttendanceController = async (req, res, next) => {
  try {
    // Assuming the required data is in the request body
    const studentData = req.body;

    // Use the fetchStudents Service to fetch desired students
    const students = await attendanceService.fetchStudents(studentData);

    // enter preAttendanceData into the attendance table
    await attendanceService.addStudents(studentData);
    res.status(200).send(students);
  } catch (error) {
    console.error("Error in fetchStudentsDetails:", error);
    res.status(500).send("Internal Server Error");
  }
};

//check if attendance already taken for given period and add the attendance data (status-present or absent) into table if not
exports.takeAttendanceController = async (req, res, next) => {
  try {
    const { studentData, attendance } = req.body;
    console.log(attendance);
    const result = await attendanceService.takeAttendance(
      studentData,
      attendance
    );
    res.status(200).send(result.message);
  } catch (error) {
    console.error("Error in takeAttendance route:", error.message);
    res.status(500).send(err.message);
  }
};
