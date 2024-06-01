const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authMiddleware = (req, res, next) => {
  const token = req.headers.token.split(" ")[1];

  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
      if (err) {
        return res.status(200).json({
          status: "Err",
          message: "Lỗi máy chủ token",
        });
      }

      if (user?.isAdmin) {
        next();
      } else {
        return res.status(200).json({
          status: "Err",
          message: "The authentication",
        });
      }
    });
  }
};

const authUserMiddleware = (req, res, next) => {
  const token = req.headers.token.split(" ")[1];
  const userId = req.body.user_id || req.params.id;

  if (token && userId) {
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
      if (err) {
        return res.status(200).json({
          status: "Err",
          message: "Lỗi máy chủ token",
        });
      }

      if (user?.isAdmin || user?.id === userId) {
        next();
      } else {
        return res.status(200).json({
          status: "Err",
          message: "The authentication",
        });
      }
    });
  }
};

module.exports = {
  authMiddleware,
  authUserMiddleware,
};
