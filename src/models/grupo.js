const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('grupo', {
    id_grupo: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    desc_grupo: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    id_division: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'division',
        key: 'id_division'
      }
    }
  }, {
    sequelize,
    tableName: 'grupo',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_grupo" },
        ]
      },
      {
        name: "fk_grupo_division1_idx",
        using: "BTREE",
        fields: [
          { name: "id_division" },
        ]
      },
    ]
  });
};
