import { AccountService } from "../services/account";
import { Request, Response } from "express";
import { RequestUtils } from "../utils/request"
import { CustomRequest } from "../interfaces/request";


export class AccountController {

    static async findAll(req: Request, res: Response) {
        /* #swagger.parameters['page'] = {
            in: 'query',
            type: 'number'
        }
        #swagger.parameters['amount'] = {
            in: 'query',
            type: 'number'
        }
        #swagger.parameters['search'] = {
            in: 'query',
            type: 'string'
        }
        #swagger.parameters['search_by'] = {
            in: 'query',
            type: 'array'
        }
        #swagger.parameters['sort'] = {
            in: 'query',
            type: 'string'
        }
        #swagger.parameters['sort_by'] = {
            in: 'query',
            type: 'array'
        }
        */
        try {
            const { 
                page, 
                amount, 
                search, 
                search_by, 
                sort, 
                sort_by 
            } = RequestUtils.parsePaginationQueryString(req);

            const accountService =  new AccountService()
            const accounts = await accountService.findAll(
                page, 
                amount, 
                search, 
                search_by, 
                sort, 
                sort_by
            );

            //remove password from response
            accounts.forEach(function(v){ delete v.password });

            res.status(200).json(accounts);
        } catch(error) {
            console.log(error);
            res.status(500).json({"error": error.message});
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
            var account = await accountService.create(req.body);
            account = await accountService.addProfile(account, null)
            
            //remove password from response
            delete account.password;

            res.status(201).json(account);
        } catch(error) {
            console.log(`Debug: catch error = ${error}`)
            res.status(500).json({"error": error.message});
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
            
            //remove password from response
            delete account.password;

            res.status(200).json(account);
        } catch (error) {
            res.status(500).json({ "error": error.message });
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
          
          //remove password from response
          delete account.password;

          res.status(200).json(account);
        } catch (error) {
          res.status(500).json({ "error": error.message });
        }
    }
    static async findById(req: Request, res: Response) {
        try {
          const accountService =  new AccountService()
          const account = await accountService.findById(req.params.id);
          
          //remove password from response
          delete account.password;

          res.status(200).json(account);
        } catch (error) {
          res.status(500).json({ "error": error.message });
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
    static async updateProfile(req: CustomRequest, res: Response) {
        /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/profileInSchema"
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
            const accountService =  new AccountService();
            console.log(req.currentUser);
            const selectedAccount = await accountService.findById(req.currentUser.id);

            // if account not found
            if (!selectedAccount) {
                return res.status(404).json({"error": "account not found"})
            }

            const account = await accountService.updateProfile(selectedAccount, req.body);
            
            //remove password from response
            delete account.password;

            res.status(200).json(account);
        } catch (error) {
            res.status(500).json({ "error": error.message });
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
}