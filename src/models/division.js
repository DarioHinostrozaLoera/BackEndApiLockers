const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('division', {
    id_division: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    desc_division: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'division',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_division" },
        ]
      },
    ]
  });
};
