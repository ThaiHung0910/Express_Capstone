import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class nguoi_dung extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    nguoi_dung_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "email"
    },
    mat_khau: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    ho_ten: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    tuoi: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    anh_dai_dien: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    pass_encrypted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },
    refresh_token: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'nguoi_dung',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "nguoi_dung_id" },
        ]
      },
      {
        name: "email",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
    ]
  });
  }
}
