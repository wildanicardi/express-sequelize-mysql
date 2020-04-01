'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    nama: DataTypes.STRING,
    email: DataTypes.STRING,
    password:DataTypes.STRING,
  }, {});
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Materi, {
      foreignKey: 'userId'
    });
  };
  return User;
};