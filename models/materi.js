'use strict';
module.exports = (sequelize, DataTypes) => {
  const Materi = sequelize.define('Materi', {
    nama_matakuliah: DataTypes.STRING,
    judul: DataTypes.STRING,
    file_url: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
    }
  }, {});
  Materi.associate = function (models) {
    // associations can be defined here
    Materi.belongsTo(models.User, {
      foreignKey: 'userId'
    });
  };
  return Materi;
};