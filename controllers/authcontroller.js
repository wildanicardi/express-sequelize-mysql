const {
  User
} = require("../models");
const {
  registerValidation,
  loginValidation,
  findByCredentials
} = require("../helper/validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
exports.registerUser = async (req, res) => {
  const {
    nama,
    email,
    password
  } = req.body;
  const {
    error
  } = registerValidation({
    nama,
    email,
    password
  });
  if (error)
    return res.json({
      status: 400,
      message: "Kesalahan dalam validasi"
    });
  const emailExist = await User.findOne({
    where: {
      email: email
    }
  });
  if (emailExist)
    return res.json({
      status: 400,
      message: "Email sudah ada"
    });
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  try {
    const result = await User.create({
      nama,
      email,
      password: hashPassword
    });
    res.json({
      success: 200,
      data: result
    });
  } catch (error) {
    res.json({
      status: 500,
      message: error.message
    });
  }
};
exports.login = async (req, res) => {
  const {
    email,
    password
  } = req.body;
  const {
    error
  } = loginValidation({
    email,
    password
  });
  if (error)
    return res.json({
      status: 400,
      message: "Kesalahan dalam validasi"
    });
  try {
    const user = await findByCredentials({
      email,
      password
    });
    const token = jwt.sign({
        id: user.id
      },
      process.env.TOKEN_SECRET
    );
    res.json({
      access_token: token,
      status: 200,
      message: "login sukses"
    });
  } catch (error) {
    res.json({
      status: 500,
      message: "Email atau password salah"
    });
  }
};
exports.logout = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) return res.json({
    status: 401,
    message: 'Acces Denied'
  });
  try {
    const verified = await jwt.destroy(token);
    return res.json({
      status: 200,
      message: "Berhasil Logout"
    });
  } catch (error) {
    console.log(error.message);

  }
}