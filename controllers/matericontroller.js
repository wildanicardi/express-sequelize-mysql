const {
  Materi
} = require("../models");
const {
  materiValidation
} = require("../helper/validation");
const atob = require("atob");

exports.storeMateri = async (req, res) => {
  const {
    nama_matakuliah,
    judul,
    file_url
  } = req.body;
  const {
    error
  } = materiValidation({
    nama_matakuliah,
    judul,
    file_url
  });
  if (error)
    return res.json({
      status: 400,
      message: "Kesalahan dalam validasi"
    });
  const token = req.header("auth-token").split(".")[1];
  const payload = JSON.parse(atob(token));
  const id = payload.id;
  try {
    const result = await Materi.create({
      nama_matakuliah,
      judul,
      file_url,
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
  try {
    const result = await Materi.findAll({
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
  const id = req.params.id;
  const {
    nama_matakuliah,
    judul,
    file_url
  } = req.body;
  try {
    const materi = await Materi.findOne({
      where: {
        id: id
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
  try {
    const {
      id
    } = req.params;
    const materi = await Materi.findOne({
      where: {
        id: id
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
  try {
    const {
      id
    } = req.params;
    const result = await Materi.findOne({
      where: {
        id: id
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