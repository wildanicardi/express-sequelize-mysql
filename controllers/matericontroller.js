const {
  Materi
} = require("../models");
const {
  materiValidation
} = require("../helper/validation");

exports.storeMateri = async (req, res) => {
  const {
    nama_matakuliah,
    judul
  } = req.body;
  const {
    id
  } = req.user;
  const {
    error
  } = materiValidation({
    nama_matakuliah,
    judul,
  });
  if (error)
    return res.json({
      status: 400,
      message: "Kesalahan dalam validasi"
    });
  try {
    const result = await Materi.create({
      nama_matakuliah,
      judul,
      file_url: req.file.originalname,
      userId: id
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
exports.indexMateri = async (req, res) => {
  const {
    id
  } = req.user;
  try {
    const result = await Materi.findAll({
      where: {
        userId: id
      },
      include: ['User']
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
exports.updateMateri = async (req, res) => {
  const {
    id
  } = req.user;
  const {
    nama_matakuliah,
    judul,
    file_url
  } = req.body;
  try {
    const {
      idMateri
    } = req.params;
    const materi = await Materi.findOne({
      where: {
        id: idMateri,
        userId: id
      }
    });
    const result = await Materi.update({
      nama_matakuliah,
      judul,
      file_url
    }, {
      where: {
        id: id
      }
    });
    if (result && materi) {
      res.json({
        success: 200,
        message: "Materi berhasil di update",
      });
    } else {
      res.json({
        message: `Materi dengan id=${id} tidak ada`
      });
    }
  } catch (error) {
    res.json({
      status: 500,
      message: error.message
    });
  }
}
exports.deleteMateri = async (req, res) => {
  const {
    id
  } = req.user;
  try {
    const {
      idMateri
    } = req.params;
    const materi = await Materi.findOne({
      where: {
        id: idMateri,
        userId: id
      }
    });
    const result = await Materi.destroy({
      where: {
        id: id
      }
    });
    if (result && materi) {
      res.json({
        success: 200,
        message: "Materi berhasil di hapus",
      });
    } else {
      res.json({
        message: `Materi dengan id=${id} tidak ada`
      });
    }
  } catch (error) {
    res.json({
      status: 500,
      message: error.message
    });
  }
};
exports.showMateri = async (req, res) => {
  const {
    id
  } = req.user;
  try {
    const {
      idMateri
    } = req.params;
    const result = await Materi.findOne({
      where: {
        id: idMateri,
        userId: id
      },
      include: ['User']
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
}