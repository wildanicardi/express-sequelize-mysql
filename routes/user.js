const router = require("express").Router();
const {
  auth
} = require('../middleware/verifytoken');
const {
  userIndex,
  userMe
} = require('../controllers/usercontroller');

router.get('/', auth, userIndex);
router.post('/me', auth, userMe)
module.exports = router;