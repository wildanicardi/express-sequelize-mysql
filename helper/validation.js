const Joi = require("joi");
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
}
