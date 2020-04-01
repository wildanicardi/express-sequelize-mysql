const router = require("express").Router();
const {
  auth
} = require('../middleware/verifytoken');
const {
  storeMateri,
  indexMateri,
  updateMateri,
  deleteMateri,
  showMateri
} = require('../controllers/matericontroller');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + file.originalname)
  }
});
const upload = multer({
  storage: storage
})

router.get('/:idMateri', auth, showMateri);
router.get('/', auth, indexMateri);
router.post('/', auth, upload.single('file_url'), storeMateri);
router.patch('/:idMateri', auth, updateMateri);
router.delete('/:idMateri', auth, deleteMateri);

module.exports = router;