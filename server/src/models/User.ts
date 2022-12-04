import { Model, DataTypes } from "sequelize";
import sql from "../sql";
import bcrypt from "bcrypt";
import { Request } from "express";

export interface UserAttributes {
  id: number;
  username: string;
  password: string;
  token: string;
}

export interface UserCreationAttributes {
  username: string;
  password: string;
  token: string;
}

export default class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public password!: string;
  public token!: string;

  public static async getUser(id: number): Promise<User> {
    return User.findByPk(id);
  }

  public static async getUsers(): Promise<User[]> {
    return User.findAll();
  }

  public static generateUUID(): string {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
      var r = Math.random() * 16 | 0, v = c == "x" ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  public static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  public static async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  public static async createUser(username: string, password: string): Promise<User> {
    const token = User.generateUUID();
    const hash = await User.hashPassword(password);
    return User.create({ username, password: hash, token });
  }

  public static async authenticate(username: string, password: string): Promise<User> {
    const user = await User.findOne({ where: { username } });
    if (!user) throw new Error("User not found");
    const match = await User.comparePassword(password, user.password);
    if (!match) throw new Error("Incorrect password");
    return user;
  }

  public static async auth(req: Request, optional = false): Promise<User> {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token && !optional) throw new Error("No authorization header provided");
    else {
      const user = token ? await User.findOne({ where: { token } }) : null;
      if (!user && !optional) throw new Error("Invalid token");
      return user;
    }
  }

  public toPublicJSON() {
    return {
      id: this.id,
      username: this.username,
    };
  }

  public toPrivateJSON() {
    return {
      id: this.id,
      username: this.username,
      token: this.token,
    };
  }
}

User.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize: sql,
  tableName: "users"
});