import { DataTypes } from "sequelize";

import { sequelize } from "../loaders/database";
import { OrderModel } from "./Order";

export const UserModel = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      allowNull: false,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM,
      values: ["USER", "ADMIN"],
      defaultValue: "USER",
      allowNull: false,
    },
  },
  {
    timestamps: true,
    modelName: "users",
    tableName: "users",
  }
);

UserModel.sync();

UserModel.hasMany(OrderModel, {
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
  onDelete: "CASCADE",
});

OrderModel.belongsTo(UserModel, {
  foreignKey: "userId",
});
