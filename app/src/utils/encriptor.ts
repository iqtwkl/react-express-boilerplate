import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { AccountSessionInterface } from "../interfaces/account";

dotenv.config();

const { JWT_SECRET = "" } = process.env;

export class encrypt {
  static async encryptPassword(password: string) {
    const hash = bcrypt.hashSync(password, 12);
    return hash;
  }

  static generateToken(payload: AccountSessionInterface) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
  }
}
