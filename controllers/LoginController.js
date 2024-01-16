const loginService = require("../services/loginService");

exports.loginController = async (req, res, next) => {
  const userType  = req.params.user;
  const data = req.body;
  try {
    const loginResult = await loginService(data, userType);
    res.status(200).send(loginResult);
  } catch (error) {
    console.error(error);
    res.send(error.message).status(error.statusCode);
  }
};
