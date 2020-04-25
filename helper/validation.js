const Joi = require("joi");
const {
  User
} = require("../models");
const bcrypt = require("bcryptjs");
//validation register
exports.registerValidation = data => {
  const schema = Joi.object({
    nama: Joi.string()
      .min(6)
      .required(),
    email: Joi.string()
      .min(6)
      .required(),
    password: Joi.string().required()
  });
  return schema.validate(data);
};
//validation login
exports.loginValidation = data => {
  const schema = Joi.object({
    email: Joi.string()
      .min(6)
      .required(),
    password: Joi.string().required()
  });
  return schema.validate(data);
};
exports.materiValidation = data => {
  const schema = Joi.object({
    nama_matakuliah: Joi.string().required(),
    judul: Joi.string().required()
  });
  return schema.validate(data);
};
exports.findByCredentials = async ({
  email,
  password
}) => {

  const user = await User.findOne({
    where: {
      email: email
    }
  });
  if (!user) {
    return res.json({
      status: 400,
      message: "Email salah"
    });
  }
  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) {
    return res.json({
      status: 400,
      message: "Password salah"
    });
  }
  return user;
};