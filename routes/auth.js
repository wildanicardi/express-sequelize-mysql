const router = require("express").Router();
const {
  auth
} = require('../middleware/verifytoken');
const {
  registerUser,
  login,
  logout
} = require('../controllers/authcontroller')

router.post("/register", registerUser);
router.post("/login", login);
router.post("/logout", auth, logout);
module.exports = router;