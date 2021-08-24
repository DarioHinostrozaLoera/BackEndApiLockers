const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('gabeta', {
    id_gabeta: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    id_locker: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'locker',
        key: 'id_locker'
      }
    },
    id_estatus_mobiliario: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'cat_estatus_mobiliario',
        key: 'id_estatus_mobiliario'
      }
    },
    letra:{
      type: DataTypes.STRING(1),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'gabeta',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_gabeta" },
        ]
      },
      {
        name: "fk_gabeta_locker1_idx",
        using: "BTREE",
        fields: [
          { name: "id_locker" },
        ]
      },
      {
        name: "fk_gabeta_cat_estatus_mobiliario1_idx",
        using: "BTREE",
        fields: [
          { name: "id_estatus_mobiliario" },
        ]
      },
    ]
  });
};
