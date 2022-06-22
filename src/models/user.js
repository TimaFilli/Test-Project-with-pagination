import { DataTypes } from "sequelize";

export default ({ sequelize }) => {
  sequelize.define(
    "User",
    {
      userId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isAlpha: true,
        },
      },

      gender: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [["male", "female"]],
            msg: "The gender must be male or female!",
          },
        },
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      userImg: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: {
            args: 1,
            msg: "The age is too small!",
          },
          max: {
            args: 100,
            msg: "The age is too large!",
          },
        },
      },
    },
    {
      underscored: true,
      tableName: "users",
    }
  );
};
