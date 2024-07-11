import { AccountRepositoryInterface, AccountInterface } from "../interfaces/account";
import { AuthRepositoryInterface } from "../interfaces/auth";
import { Account } from "../models/Account";
import { dbDataSource } from "../configs/db.config";
import { encrypt } from "../utils/encriptor";
import {v4 as uuidv4} from 'uuid';
import { dbUtils } from '../utils/db';
import nodemailer from 'nodemailer';
import jwt from "jsonwebtoken";
const { 
    JWT_SECRET = "", MAIL_USER = "", MAIL_APP_PASSWORD = "",
    MAIL_HOST = "", MAIL_PORT = "", MAIL_SERVICE = "",  BASE_URL = ""
} = process.env;

export class AuthService implements AuthRepositoryInterface {
    async requestResetPassword(email: string): Promise<void> {
        const accountRepository = dbDataSource.getRepository(Account);
        const account = await accountRepository.findOneBy({ email });

        if(!account) {
            throw new Error("User not found");
        }

        const token = encrypt.generateToken({
            id: account.id, 
            username: account.username, 
            email: account.email, 
            fullName: account.profile ? account.profile.fullName : null
        });
        const resetUrl = `${BASE_URL}/reset_password?token=${token}`

        const transporter = nodemailer.createTransport({
            host: MAIL_HOST,
            port: MAIL_PORT,
            secure: false,
            service: MAIL_SERVICE,
            auth: {
                user: MAIL_USER,
                pass: MAIL_APP_PASSWORD
            }
        });

        const mailOptions = {
            from: 'anonymousidn211@gmail.com',
            to: email,
            subject: 'Reset Password Request',
            html: `Click <a href="${resetUrl}">here</a> to reset your password. This link will expire in 1 day.`
          };

          await transporter.sendMail(mailOptions);
    }
    async resetPassword(token: string, newPassword: string): Promise<void> {
        const decoded = jwt.verify(token, JWT_SECRET);
        const hashPassword = await encrypt.encryptPassword(newPassword);

        const accountRepository = dbDataSource.getRepository(Account);
        const account = await accountRepository.findOneBy({ id: decoded.id });
        if (!account) {
            throw new Error("User not found");
        }
        account.password = hashPassword;
        await accountRepository.save(account);
    }

}