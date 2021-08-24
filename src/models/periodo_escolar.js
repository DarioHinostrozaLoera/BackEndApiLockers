const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('periodo_escolar', {
    id_periodo: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    f_inicio: {
      type: DataTypes.DATE,
      allowNull: false
    },
    f_fin: {
      type: DataTypes.DATE,
      allowNull: false
    },
    activo: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'periodo_escolar',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_periodo" },
        ]
      },
    ]
  });
};
