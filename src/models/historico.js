const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('historico', {
    id_historico: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false
    },
    id_accion: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'cat_accion',
        key: 'id_accion'
      }
    },
    desc_evento: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    id_user: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id_user'
      }
    }
  }, {
    sequelize,
    tableName: 'historico',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_historico" },
        ]
      },
      {
        name: "fk_historico_accion1_idx",
        using: "BTREE",
        fields: [
          { name: "id_accion" },
        ]
      },
      {
        name: "fk_historico_user1_idx",
        using: "BTREE",
        fields: [
          { name: "id_user" },
        ]
      },
    ]
  });
};
