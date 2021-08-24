const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('grupo_en_curso', {
    id_grupo_curso: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    id_grupo: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'grupo',
        key: 'id_grupo'
      }
    },
    id_grado: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'cat_grado',
        key: 'id_grado'
      }
    },
    id_turno: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'cat_turno',
        key: 'id turno'
      }
    },
    id_periodo: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'periodo_escolar',
        key: 'id_periodo'
      }
    },
    num_grupo: {
      type: DataTypes.STRING(3),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'grupo_en_curso',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_grupo_curso" },
        ]
      },
      {
        name: "fk_grupo_curso_grupo1_idx",
        using: "BTREE",
        fields: [
          { name: "id_grupo" },
        ]
      },
      {
        name: "fk_grupo_curso_cat_grado1_idx",
        using: "BTREE",
        fields: [
          { name: "id_grado" },
        ]
      },
      {
        name: "fk_grupo_curso_cat_turno1_idx",
        using: "BTREE",
        fields: [
          { name: "id turno" },
        ]
      },
      {
        name: "fk_grupo_curso_periodo_escolar1_idx",
        using: "BTREE",
        fields: [
          { name: "id_periodo" },
        ]
      },
    ]
  });
};
