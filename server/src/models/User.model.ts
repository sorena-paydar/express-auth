import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";

export interface IUser extends Model {
  readonly id: number;
  readonly email: string;
  readonly username: string;
  readonly password: string;
  readonly bio: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type UserModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): IUser;
};

export function getUser(sequelize: Sequelize): UserModelStatic {
  return <UserModelStatic>sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: "Email required!",
        },
        isEmail: {
          msg: "Invalid email!",
        },
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: "Username required!",
        },
        isAlphanumeric: {
          msg: "Username must contain alphabetical and numerical characters!",
        },
        isLowercase: {
          msg: "Username must not contain uppercase english letters!",
        },
        len: {
          args: [5, 18],
          msg: "Username must be between 5 and 18 characters long!",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [0, 255],
          msg: "Bio must contain less than 255 characters!",
        },
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });
}
