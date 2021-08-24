const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cat_turno', {
    id_turno: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    desc_turno: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    inicial: {
      type: DataTypes.STRING(1),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'cat_turno',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id turno" },
        ]
      },
    ]
  });
};
