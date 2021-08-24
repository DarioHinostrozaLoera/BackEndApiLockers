const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('administrador', {
    id_division: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'division',
        key: 'id_division'
      }
    },
    id_user: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'id_user'
      }
    }
  }, {
    sequelize,
    tableName: 'administrador',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_division" },
          { name: "id_user" },
        ]
      },
      {
        name: "fk_division_has_user_user1_idx",
        using: "BTREE",
        fields: [
          { name: "id_user" },
        ]
      },
      {
        name: "fk_division_has_user_division1_idx",
        using: "BTREE",
        fields: [
          { name: "id_division" },
        ]
      },
    ]
  });
};
