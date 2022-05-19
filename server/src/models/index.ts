import { Sequelize } from "sequelize";
import { DATABASE_URL } from "../config";
import { getUser, IUser, UserModelStatic } from "./User.model";

interface IDatabase {
  sequelize: Sequelize;
  User: UserModelStatic;
}

// Sequelize
const sequelize = new Sequelize(DATABASE_URL!);

// Models
const User = getUser(sequelize);

const db: IDatabase = {
  sequelize,
  User,
};

db.sequelize
  .sync()
  .then(() => console.log("Database and tables synced"))
  .catch((err) => console.log(err));

export default db;
export type UserModel = IUser;
