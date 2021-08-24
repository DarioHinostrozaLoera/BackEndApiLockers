const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('comunicado_alumnos', {
    id_user: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'id_user'
      }
    },
    id_comunicado: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'comunicado',
        key: 'id_comunicado'
      }
    }
  }, {
    sequelize,
    tableName: 'comunicado_alumnos',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_user" },
          { name: "id_comunicado" },
        ]
      },
      {
        name: "fk_user_has_comunicado_comunicado1_idx",
        using: "BTREE",
        fields: [
          { name: "id_comunicado" },
        ]
      },
      {
        name: "fk_user_has_comunicado_user1_idx",
        using: "BTREE",
        fields: [
          { name: "id_user" },
        ]
      },
    ]
  });
};
