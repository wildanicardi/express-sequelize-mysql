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