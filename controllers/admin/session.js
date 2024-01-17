const runQuery = require("../../Utils/dbUtils");

const isActive = "0";

exports.getallSessionController = async (req, res) => {
  try {
    const results = await runQuery("SELECT * FROM tblsessionterm", []);
    console.log(results);
    res.status(200).send(results); // <-- Use 'results' instead of 'data'
  } catch (err) {
    res.status(500).send(err); // <-- Use 'err' instead of 'error'
  }
};

exports.getallTerms = async (req, res) => {
  try {
    const sql = "SELECT * FROM tblterm";
    const results = await runQuery(sql, []);
    if (results.length > 0) res.status(200).send(results);
  } catch (err) {
    res.status(500).send(error);
  }
};

exports.createSession = async (req, res, next) => {
  try {
    const checkExistingQuery =
      "SELECT * FROM tblsessionTerm WHERE sessionName = ? AND termId = ?";
    const results = await runQuery(checkExistingQuery, [
      req.body.sessionName,
      req.body.termId,
    ]);

    if (results.length > 0) {
      res.status(409).send("This sessionTerm Already Exists!");
    } else {
      const insertQuery =
        "INSERT INTO tblsessionterm (sessionName,termId,isActive,dateCreated) VALUES (?, ?, ?, ?)";
      await runQuery(insertQuery, [
        req.body.sessionName,
        req.body.termId,
        isActive,
        req.body.dateCreated,
      ]);
      res.status(200).send("sessionTerm created successfully");
    }
  } catch (error) {
    res.status(400).send(error.sqlMessage);
  }
};

exports.updateSessionDetails = async (req, res, next) => {
  try {
    const updateQuery =
      "UPDATE tblsessionterm SET sessionName=?, termId=? , isActive= ? WHERE Id = ?";
    const updateResult = await runQuery(updateQuery, [
      req.body.sessionName,
      req.body.termId,
      isActive,
      req.params.id,
    ]);

    if (updateResult.affectedRows > 0) {
      res
        .status(200)
        .json({ success: true, message: "session updated successfully" });
    } else {
      res
        .status(404)
        .json({ success: false, message: "session not found or not updated" });
    }
  } catch (error) {
    res.status(400).send(error.sqlMessage);
  }
};

exports.deleteSession = async (req, res, next) => {
  try {
    const deleteQuery = "DELETE FROM tblclassarms WHERE Id=?";
    const deleteResult = await runQuery(deleteQuery, [req.params.id]);

    if (deleteResult.affectedRows > 0) {
      return { success: true, message: "session deleted successfully" };
    } else {
      return { success: false, message: "session not found or not deleted" };
    }
  } catch (error) {
    res.status(400).send(`Error deleting the session: ${error.sqlMessage}`);
  }
};
