const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('locker', {
    id_locker: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    num_serie: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    num_inventario: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    id_estatus_mobiliario: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'cat_estatus_mobiliario',
        key: 'id_estatus_mobiliario'
      }
    },
    id_division: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'division',
        key: 'id_division'
      }
    },
    num_local: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'locker',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_locker" },
        ]
      },
      {
        name: "fk_locker_cat_estatus_mobiliario1_idx",
        using: "BTREE",
        fields: [
          { name: "id_estatus_mobiliario" },
        ]
      },
      {
        name: "fk_locker_division1_idx",
        using: "BTREE",
        fields: [
          { name: "id_division" },
        ]
      },
    ]
  });
};
