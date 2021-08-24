const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('comunicado', {
    id_comunicado: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    id_periodo: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'periodo_escolar',
        key: 'id_periodo'
      }
    },
    titulo: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    texto: {
      type: DataTypes.STRING(400),
      allowNull: false
    },
    id_division: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'administrador',
        key: 'id_division'
      }
    },
    id_user: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'administrador',
        key: 'id_user'
      }
    }
  }, {
    sequelize,
    tableName: 'comunicado',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_comunicado" },
        ]
      },
      {
        name: "fk_comunicado_periodo_escolar1_idx",
        using: "BTREE",
        fields: [
          { name: "id_periodo" },
        ]
      },
      {
        name: "fk_comunicado_division_has_user1_idx",
        using: "BTREE",
        fields: [
          { name: "id_division" },
          { name: "id_user" },
        ]
      },
    ]
  });
};
