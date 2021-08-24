const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('alumnos', {
    id_grupo_curso: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'grupo_en_curso',
        key: 'id_grupo_curso'
      }
    },
    id_user: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id_user'
      }
    },
    id_gabeta: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'gabeta',
        key: 'id_gabeta'
      }
    }
  }, {
    sequelize,
    tableName: 'alumnos',
    timestamps: false,
    indexes: [
      {
        name: "fk_alumnos_grupo_curso1_idx",
        using: "BTREE",
        fields: [
          { name: "id_grupo_curso" },
        ]
      },
      {
        name: "fk_alumnos_user1_idx",
        using: "BTREE",
        fields: [
          { name: "id_user" },
        ]
      },
      {
        name: "fk_alumnos_gabeta1_idx",
        using: "BTREE",
        fields: [
          { name: "id_gabeta" },
        ]
      },
    ]
  });
};
