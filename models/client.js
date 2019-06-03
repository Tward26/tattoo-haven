module.exports = function (sequelize, DataTypes) {
  const Client = sequelize.define('Client', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        is: /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    idea: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });

  Client.associate = function (models) {
    // Associating Client with Artist
    Client.belongsTo(models.Artist, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Client;
};
