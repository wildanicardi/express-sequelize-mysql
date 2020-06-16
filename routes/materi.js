const router = require("express").Router();
const { auth } = require("../middleware/verifytoken");
const {
  storeMateri,
  indexMateri,
  updateMateri,
  deleteMateri,
  showMateri,
} = require("../controllers/matericontroller");
const multer = require("multer");
const DIR = "./uploads";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, DIR);
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, fileName);
  },
});
const upload = multer({
  storage: storage,
});

router.get("/:idMateri", auth, showMateri);
router.get("/", auth, indexMateri);
router.post("/", auth, upload.single("file_url"), storeMateri);
router.patch("/:idMateri", auth, upload.single("file_url"), updateMateri);
router.delete("/:idMateri", auth, deleteMateri);

module.exports = router;
