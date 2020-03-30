const router = require("express").Router();
const {
  auth
} = require('../helper/verifytoken');
const {
  userIndex
} = require('../controllers/usercontroller');

router.get('/', auth, userIndex);

module.exports = router;