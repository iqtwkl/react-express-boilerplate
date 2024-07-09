import { Request, Response } from "express";
import { AccountService } from '../services/account';
import { AuthService } from '../services/auth';
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
            const token = encrypt.generateToken({ id: account.id });
    
            res.status(200).json({
                success: true,
                token: token,
                // refresh: 'sometoken'
            });
        } catch(error) {
            res.status(500).json({"error": error});
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
    static async requestResetPassowrd(req: Request, res: Response) {
        /*  #swagger.requestBody = {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/requestResetPasswordInSchema"
                        }  
                    }
                }
            }
            #swagger.tags = ['Auth'] 
        */
        try {
            const { email } = req.body;

            const authService = new AuthService();

            await authService.requestResetPassword(email);
            
            res.status(200).json({"message": "Email sent successfully"})
        } catch (error) {
            res.status(500).json({"error": error});
        }
    }
    static async resetPassword(req: Request, res: Response) {
        /*  #swagger.requestBody = {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/resetPasswordInSchema"
                        }  
                    }
                }
            }
            #swagger.tags = ['Auth'] 
        */
       try {
            const { token, newPassword } = req.body;

            const authService = new AuthService();

            await authService.resetPassword(token, newPassword);
            
            res.status(200).json({"message": "Password reset successfully"})
        } catch (error) {
            res.status(500).json({"error": error});
        }
    }
}