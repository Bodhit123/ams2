const classService = require('../../services/admin/classService');

exports.getAllClassesController = async (req, res, next) => {
  try {
    const results = await classService.getAllClasses();
    res.status(200).send(results);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getallArmsByClass = async (req, res, next) => {
  try {
    const results = await classService.getallArmsByClass(req.params.id);
    res.status(200).send(results);
    console.log(results);
  } catch (error) {
    res.status(500).send(error);
  }
};


exports.getAllClassesASCController = async (req, res, next) => {
  try {
    const results = await classService.getAllClassesASC();
    res.status(200).send(results);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.createClassController = async (req, res, next) => {
  try {
    const result = await classService.createClass(req.body.className);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateClassDetailsController = async (req, res, next) => {
  const classID = req.params.id;
  const className = req.body.className;

  try {
    const result = await classService.updateClassDetails(classID, className);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteClassController = async (req, res, next) => {
  const classID = req.params.id;

  try {
    const result = await classService.deleteClass(classID);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};
