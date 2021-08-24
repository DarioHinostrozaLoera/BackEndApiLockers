const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cat_grado', {
    id_grado: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    desc_grado: {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    num_pref: {
      type: DataTypes.STRING(3),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'cat_grado',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_grado" },
        ]
      },
    ]
  });
};
