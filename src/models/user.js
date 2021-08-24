const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    id_user: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    salt: {
      type: DataTypes.STRING(8),
      allowNull: false
    },
    token_refresh: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    nombre: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    ap_paterno: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    ap_materno: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    id_cat_estatus: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'cat_estatus_user',
        key: 'id_cat_estatus'
      }
    },
    id_rol: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'cat_rol',
        key: 'id_rol'
      }
    },
    matricula: {
      type: DataTypes.STRING(45),
      allowNull: true,
      unique: "matricula_UNIQUE"
    },
    num_empleado: {
      type: DataTypes.STRING(45),
      allowNull: true,
      unique: "num_empleado_UNIQUE"
    },
    id_user_superior: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: {
        model: 'user',
        key: 'id_user'
      }
    }
  }, {
    sequelize,
    tableName: 'user',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_user" },
        ]
      },
      {
        name: "matricula_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "matricula" },
        ]
      },
      {
        name: "num_empleado_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "num_empleado" },
        ]
      },
      {
        name: "fk_user_cat_estatus1_idx",
        using: "BTREE",
        fields: [
          { name: "id_cat_estatus" },
        ]
      },
      {
        name: "fk_user_rol1_idx",
        using: "BTREE",
        fields: [
          { name: "id_rol" },
        ]
      },
      {
        name: "fk_user_user1_idx",
        using: "BTREE",
        fields: [
          { name: "id_user_superior" },
        ]
      },
    ]
  });
};
