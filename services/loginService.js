const runQuery  = require("../Utils/dbUtils");

const loginService = async (data, userType) => {
  let sql;
  const { email, password } = data;

  if (!email || !password) {
    throw {
      message: "Please Enter Email & Password",
      statusCode: 400,
    };
  }

  if (userType === "admin") {
    sql = "SELECT * FROM tbladmin WHERE emailAddress = ? AND password = ?";
  } else if (userType === "teacher") {
    sql =
      "SELECT * FROM tblclassteacher WHERE emailAddress = ? AND password = ?";
  } else {
    throw { message: "Invalid user type", statusCode: 400 };
  }

  try {
    const result = await runQuery(sql, [email, password]);

    if (result.length === 0) {
      throw {
        message: "Invalid username or password",
        statusCode: 401,
      };
    }

    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = loginService;
