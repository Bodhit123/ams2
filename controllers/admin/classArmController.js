const classArmService = require("../../services/admin/classArmService");

exports.AllArmsController = async (req, res, next) => {
  try {
    const results = await classArmService.getAllArms();
    res.status(200).send(results);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

exports.ExistingArmsByDivisionController = async (req, res, next) => {
  try {
    const results = await classArmService.getExistingArms_By_division();

    if (!results || results.length === 0) {
      // Handle the case where no classArms are found
      res.status(500).send("No classArms Found ");
    }
    res.status(200).send(results);
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to get Classarm");
  }
};

exports.getByIdController = async (req, res, next) => {
  try {
    const results = await classArmService.getById(req.params.id);

    if (!results) {
      res.status(404).send("Classarm not Found");
    }
    res.status(200).send(results);
  } catch (error) {
    res.status(500).send("Failed to get Classarm");
  }
};

exports.createArmController = async (req, res, next) => {
  const { classId, classArmName } = req.body;
  try {
    const result = await classArmService.createArm(classId, classArmName);

    if (result === "This ClassArm Already Exists!") {
      // Handle the case where the classArm already exists
      res.status(409).send(result); // 409 Conflict status code
    } else if (result === "ClassArm created successfully") {
      // ClassArm creation successful
      res.status(200).send(result);
    } else {
      // Unexpected response from the service
      res.status(500).send("Unexpected response from classArmService");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.updateClassArmDetailsController = async (req, res, next) => {
  const armID = req.params.id;
  const classID = req.body.classID;
  const classArmName = req.body.classArmName;

  try {
    const result = await classArmService.updateClassArmDetails(
      armID,
      classID,
      classArmName
    );

    if (result.success) {
      // Update successful
      res.status(200).send(result);
    } else {
      // ClassArm not found or not updated
      res.status(404).send(result.message);
    }
  } catch (error) {
    // Service threw an error
    res.status(404).send("Failed to update classarm");
  }
};

exports.deleteClassArmController = async (req, res, next) => {
  const armID = req.params.id;

  try {
    const result = await classArmService.deleteClassArm(armID);

    if (result.success) {
      // Deletion successful
      res.status(200).send(result);
    } else {
      // ClassArm not found or not deleted
      res.status(404).send(result.message);
    }
  } catch (error) {
    // Service threw an error 
    res.status(500).send(error);
  }
};
