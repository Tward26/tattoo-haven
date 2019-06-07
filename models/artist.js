module.exports = function(sequelize, DataTypes) {
  const Artist = sequelize.define('Artist', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true 
      }
    },
    profilepath: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gallerypath: {
      type: DataTypes.JSON,
      allowNull: false
    },
    googlepath: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isURL: true
      }
    }
  });

  Artist.associate = function(models) {
    // Associating Arist with Clients
    // When an Arist is deleted, also delete any associated Clients
    Artist.hasMany(models.Client, {
      onDelete: 'cascade'
    });
  };

  return Artist;
};
