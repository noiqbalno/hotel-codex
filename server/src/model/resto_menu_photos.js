import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class resto_menu_photos extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    remp_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    remp_thumbnail_filename: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    remp_photo_filename: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    remp_prime: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    remp_url: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    remp_reme_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'resto_menus',
        key: 'reme_id'
      }
    }
  }, {
    sequelize,
    tableName: 'resto_menu_photos',
    schema: 'resto',
    timestamps: false,
    indexes: [
      {
        name: "resto_menu_photos_pkey",
        unique: true,
        fields: [
          { name: "remp_id" },
        ]
      },
    ]
  });
  }
}
