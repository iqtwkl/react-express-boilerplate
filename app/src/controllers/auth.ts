import { Request, Response } from "express";
import { AccountService } from '../services/account';
import bcrypt from "bcrypt";
import { encrypt } from "../utils/encriptor";

export class AuthController {
    static async login(req: Request, res: Response) {
        /*  #swagger.requestBody = {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/loginInputSchema"
                        }  
                    }
                }
            }
            #swagger.tags = ['Auth'] 
        */
        try {
            const { username, password } = req.body;

            const accountService = new AccountService();
            const account = await accountService.findByUsername(username);
        
            if (!account) {
                return res.status(404).json({ status: false, error: "Account not found" });
            }
            
            const isPasswordMatch = await bcrypt.compare(password, account.password);
        
            if (!isPasswordMatch) {
                return res.status(401).json({ status: false, error: "Invalid credentials" });
            }
            // generate token
            const token = encrypt.generateToken({id: account.id, username: account.username, email: account.email, fullName: account.profile.fullName});

            res.status(200).json({
                success: true,
                token: token,
            });
        } catch(error) {
            res.status(500).json({"error": error.message})
        }
        /* #swagger.responses[200] = {
                description: "",
                content: {
                    "application/json": {
                        schema:{
                            $ref: "#/components/schemas/loginOutputSchema"
                        }
                    }           
                }
            }   
        */
    }
}