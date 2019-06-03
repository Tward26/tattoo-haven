module.exports = function (sequelize, DataTypes) {
  var Client = sequelize.define('Client', {
    name: {
      type: DataTypes.STRING,
      validate: {
        allowNull: false
      }
    },
    phone: {
      type: DataTypes.TEXT,
      validate: {
        allowNull: false,
        is: /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        allowNull: false,
        isEmail: true
      }
    },
    idea: {
      type: DataTypes.TEXT,
      validate: {
        allowNull: false
      }
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
