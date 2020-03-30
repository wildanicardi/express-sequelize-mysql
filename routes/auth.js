const router = require("express").Router();
const User = require("../models/user");
const {
  registerUser,
  login
} = require('../controllers/authcontroller')

router.post("/register", registerUser);
router.post("/login", login);
module.exports = router;