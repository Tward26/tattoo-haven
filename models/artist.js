module.exports = function(sequelize, DataTypes) {
  var Artist = sequelize.define('Artist', {
    name: {
      type: DataTypes.STRING,
      validate: {
        allowNull: false
      }
    },
    bio: {
      type: DataTypes.TEXT,
      validate: {
        allowNull: false
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        allowNull: false,
        isEmail: true 
      }
    },
    imagepath: {
      type: DataTypes.JSON
    },
    googlepath: {
      type: DataTypes.STRING,
      validate: {
        isURL: true
      }
    }
  });

  Arist.associate = function(models) {
    // Associating Arist with Clients
    // When an Arist is deleted, also delete any associated Clients
    Arist.hasMany(models.Client, {
      onDelete: 'cascade'
    });
  };

  return Artist;
};
