const {
  User
} = require("../models");

exports.userIndex = async (req, res) => {
  try {
    const result = await User.findAll();
    res.json({
      status: 200,
      result: result
    });
  } catch (error) {
    res.json({
      message: error.message
    })
  }
}
exports.userMe = async (req, res) => {
  const {
    id
  } = req.user;
  try {
    const result = await User.findOne({
      where: {
        id: id
      }
    });
    res.json({
      success: 200,
      data: result
    })
  } catch (error) {
    res.json({
      status: 500,
      message: error.message
    });
  }
}