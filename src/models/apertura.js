const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('apertura', {
    id_apertura: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    fecha_hora: {
      type: DataTypes.DATE,
      allowNull: false
    },
    id_gabeta: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    id_periodo: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    id_user: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'apertura',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_apertura" },
        ]
      },
      {
        name: "fk_apertura_gabeta1_idx",
        using: "BTREE",
        fields: [
          { name: "id_gabeta" },
        ]
      },
      {
        name: "fk_apertura_periodo_escolar1_idx",
        using: "BTREE",
        fields: [
          { name: "id_periodo" },
        ]
      },
      {
        name: "fk_apertura_user1_idx",
        using: "BTREE",
        fields: [
          { name: "id_user" },
        ]
      },
    ]
  });
};
