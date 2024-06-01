const UserServices = require("../services/UserServices.js");
const JwtServices = require("../services/JwtServices.js");

// Tạo tài khoản
const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const isCheckEmail = regEmail.test(email);
    if (!email || !password) {
      return res.status(200).json({
        status: "Err",
        message: "The input is required",
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: "Err",
        message: "The input is not email",
      });
    }

    const response = await UserServices.createUser(req.body);

    return res.status(200).json(response);
  } catch (err) {
    return res.status(404).json({
      message: err,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const isCheckEmail = regEmail.test(email);
    if (!email || !password) {
      return res.status(200).json({
        status: "Err",
        message: "The input is required",
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: "Err",
        message: "The input is not email",
      });
    }

    const response = await UserServices.loginUser(req.body);
    const { refresh_token, ...newResponse } = response;

    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    return res.status(200).json(newResponse);
  } catch (err) {
    return res.status(404).json({
      message: err,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const response = await UserServices.updateUser(req.body, userId);
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const response = await UserServices.deleteUser(userId);
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err,
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    const response = await UserServices.getAllUser();
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err,
    });
  }
};

const getDetailUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const response = await UserServices.getDetailUser(userId);
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err,
    });
  }
};

const refreshToken = async (req, res) => {
  try {
    const token = req.cookies.refresh_token;
    if (!token) {
      return res.status(200).json({
        status: "Err",
        message: "The token is required",
      });
    }

    const response = await JwtServices.RefreshToken(token);
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err,
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("refresh_token");
    return res.status(200).json({
      status: "OK",
      message: "Đăng xuất thành công",
    });
  } catch (err) {
    return res.status(404).json({
      message: err,
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(200).json({
        status: "Err",
        message: "The Email is required",
      });
    }
    const response = await UserServices.forgotPassword(email);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(404).json({
      message: err,
    });
  }
};

const verifyForgotPassword = async (req, res) => {
  try {
    const { code } = req.body;
    const token = req.headers.token.split(" ")[1];
    if (!code) {
      return res.status(200).json({
        status: "Err",
        message: "The Code is required",
      });
    }
    if (!token) {
      return res.status(200).json({
        status: "Err",
        message: "The token is required",
      });
    }
    const response = await UserServices.verifyForgotPassword(code, token);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(404).json({
      message: err,
    });
  }
};
const updatePassword = async (req, res) => {
  try {
    const { newPassword, email } = req.body;
    if (!newPassword) {
      return res.status(200).json({
        status: "Err",
        message: "The newPassword is required",
      });
    }
    if (!email) {
      return res.status(200).json({
        status: "Err",
        message: "The email is required",
      });
    }

    const response = await UserServices.updatePassword(newPassword, email);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(404).json({
      message: err,
    });
  }
};

module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUser,
  getDetailUser,
  refreshToken,
  logoutUser,
  forgotPassword,
  verifyForgotPassword,
  updatePassword,
};
