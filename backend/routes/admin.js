const express = require("express");
const router = express.Router();
const {
  getAllStudentsController,
  createStudentController,
  updateStudentDetailsController,
  deleteStudentController,
} = require("../controllers/admin/studentController");
const {
  getAllClassesController,
  getAllClassesASCController,
  createClassController,
  updateClassDetailsController,
  deleteClassController,
  getallArmsByClass
} = require("../controllers/admin/classController");
const {
  AllArmsController,
  ExistingArmsByDivisionController,
  getByIdController,
  createArmController,
  updateClassArmDetailsController,
  deleteClassArmController,
} = require("../controllers/admin/classArmController");

const {
  getAllTeachersController,
  createTeacherController,
  deleteTeacherController,
} = require("../controllers/admin/teacherController");
const {
  createSession,
  deleteSession,
  updateSessionDetails,
  getallSessionController,
  getallTerms
} = require("../controllers/admin/session");

router.route("/student/getall").get(getAllStudentsController);
router.route("/student/create").post(createStudentController);
router
  .route("/student/:id")
  .put(updateStudentDetailsController)
  .delete(deleteStudentController);

router.route("/teacher/getall").get(getAllTeachersController);
router.route("/teacher/create").post(createTeacherController);
router.route("/teacher/:id/:armid").delete(deleteTeacherController);

router.route("/class/getall").get(getAllClassesController);
router.route("/class/arms/getall/:id").get(getallArmsByClass);
router.route("/class/getallASC").get(getAllClassesASCController);
router.route("/class/create").post(createClassController);
router
  .route("/class/:id")
  .put(updateClassDetailsController)
  .delete(deleteClassController);

router.route("/classarm/getall").get(AllArmsController);
router.route("/classarm/getallByClassId").get(ExistingArmsByDivisionController);
router.route("/classarm/getById/:id").get(getByIdController);
router.route("/classarm/create").post(createArmController);
router
  .route("/classarm/:id")
  .put(updateClassArmDetailsController)
  .delete(deleteClassArmController);


router.route("/session/getall").get(getallSessionController);
router.route("/session/term/getall").get(getallTerms);
router.route("/session/create").post(createSession);
router.route("/session/:id").put(updateSessionDetails).delete(deleteSession);



module.exports = router;
