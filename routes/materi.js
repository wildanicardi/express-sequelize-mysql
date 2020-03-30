const router = require("express").Router();
const {
  auth
} = require('../helper/verifytoken');
const {
  storeMateri,
  indexMateri,
  updateMateri,
  deleteMateri,
  showMateri
} = require('../controllers/matericontroller');

router.get('/:id', auth, showMateri);
router.get('/', auth, indexMateri);
router.post('/', auth, storeMateri);
router.patch('/:id', auth, updateMateri);
router.delete('/:id', auth, deleteMateri);

module.exports = router;