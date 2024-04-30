import { AccountService } from "../services/account";
import { Request, Response } from "express";


export class AccountController {

    static async findAll(req: Request, res: Response) {
        try {
            const accountService =  new AccountService()
            const accounts = await accountService.findAll();
            res.status(200).json(accounts);
        } catch(error) {
            res.status(500).json({"error": error});
        }
        /* 
        #swagger.tags = ['Account']
        #swagger.security = [{
            "bearerAuth": []
        }] 
        #swagger.responses[200] = {
            description: "",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/listAccountSchema"
                    }
                }           
            }
        }   
        */
    }

    static async create(req: Request, res: Response) {
        /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/accountInSchema"
                    }  
                }
            }
        } 
        #swagger.security = [{
            "bearerAuth": []
        }]
        #swagger.tags = ['Account']
        */
        try {
            const accountService =  new AccountService()
            const account = await accountService.create(req.body);
            res.status(201).json(account);
        } catch(error) {
            console.log(`Debug: catch error = ${error}`)
            res.status(500).json({"error": error});
        }
        /* #swagger.responses[200] = {
            description: "",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/accountSchema"
                    }
                }           
            }
        }   
        */
    }

    static async update(req: Request, res: Response) {
        /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/accountInSchema"
                    }  
                }
            }
        } 
        #swagger.security = [{
            "bearerAuth": []
        }]
        #swagger.tags = ['Account']
        */
        try {
            const accountService =  new AccountService()
            const account = await accountService.update(req.params.id, req.body);
            res.status(200).json(account);
        } catch (error) {
            res.status(500).json({ error: error });
        }
        /* #swagger.responses[200] = {
            description: "",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/accountSchema"
                    }
                }           
            }
        }   
        */
    }

    static async delete(req: Request, res: Response) {
        /*
        #swagger.tags = ['Account']
        #swagger.security = [{
            "bearerAuth": []
        }]
        */
        try {
          const accountService =  new AccountService()
          const account = await accountService.delete(req.params.id);
          res.status(200).json(account);
        } catch (error) {
          res.status(500).json({ error: error });
        }
    }
    static async findById(req: Request, res: Response) {
        try {
          const accountService =  new AccountService()
          const account = await accountService.findById(req.params.id);
          res.status(200).json(account);
        } catch (error) {
          res.status(500).json({ error: error });
        }
        /* 
        #swagger.tags = ['Account']
        #swagger.security = [{
            "bearerAuth": []
        }]
        #swagger.responses[200] = {
            description: "",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/accountSchema"
                    }
                }           
            }
        }   
        */
    }
}