import { GroupService } from "../services/group";
import { Request, Response } from "express";
import { RequestUtils } from "../utils/request";

export class GroupController {
    static async findAll(req: Request, res: Response){
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

            const groupService = new GroupService();
            const groups = await groupService.findAll(
                page,
                amount,
                search,
                search_by,
                sort,
                sort_by
            );

            res.status(200).json(groups)
        } catch(error) {
            console.log(error);
            res.status(500).json({"error": error.message});
        }
        /* 
        #swagger.tags = ['Group']
        #swagger.security = [{
            "bearerAuth": []
        }] 
        #swagger.responses[200] = {
            description: "",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/listGroupSchema"
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
                        $ref: "#/components/schemas/groupInSchema"
                    }  
                }
            }
        } 
        #swagger.security = [{
            "bearerAuth": []
        }]
        #swagger.tags = ['Group']
        */
        try {
            const groupService =  new GroupService()
            const group = await groupService.create(req.body);

            res.status(201).json(group);
        } catch(error) {
            console.log(`Debug: catch error = ${error}`)
            res.status(500).json({"error": error.message});
        }
        /* #swagger.responses[200] = {
            description: "",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/groupSchema"
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
                        $ref: "#/components/schemas/groupInSchema"
                    }  
                }
            }
        } 
        #swagger.security = [{
            "bearerAuth": []
        }]
        #swagger.tags = ['Group']
        */
        try {
            const groupService =  new GroupService()
            const group = await groupService.update(req.params.id, req.body);

            res.status(200).json(group);
        } catch (error) {
            res.status(500).json({ "error": error.message });
        }
        /* #swagger.responses[200] = {
            description: "",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/groupSchema"
                    }
                }           
            }
        }   
        */
    }
    static async delete(req: Request, res: Response) {
        /*
        #swagger.tags = ['Group']
        #swagger.security = [{
            "bearerAuth": []
        }]
        */
        try {
          const groupService =  new GroupService()
          const group = await groupService.delete(req.params.id);

          res.status(200).json(group);
        } catch (error) {
          res.status(500).json({ "error": error.message });
        }
    }
    static async findById(req: Request, res: Response) {
        try {
          const groupService =  new GroupService()
          const group = await groupService.findById(req.params.id);

          res.status(200).json(group);
        } catch (error) {
          res.status(500).json({ "error": error.message });
        }
        /* 
        #swagger.tags = ['Group']
        #swagger.security = [{
            "bearerAuth": []
        }]
        #swagger.responses[200] = {
            description: "",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/groupSchema"
                    }
                }           
            }
        }   
        */
    }
    static async findByName(req: Request, res: Response) {
        try {
          const groupService =  new GroupService();
          const group = await groupService.findByName(req.params.name);

          res.status(200).json(group);
        } catch (error) {
          res.status(500).json({ "error": error.message });
        }
        /* 
        #swagger.tags = ['Group']
        #swagger.security = [{
            "bearerAuth": []
        }]
        #swagger.responses[200] = {
            description: "",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/groupSchema"
                    }
                }           
            }
        }   
        */
    }
    static async addAccount(req: Request, res: Response) {
        /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/groupAccountsInSchema"
                    }  
                }
            }
        } 
        */
       try {
          const { accountId } = req.body;
          const groupService = new GroupService();
          const accountsInGroup = await groupService.addAccount(accountId, req.params.id);

          res.status(200).json(accountsInGroup);
       } catch (error) {
          res.status(500).json({ "error": error.message });
       }
       /* 
        #swagger.tags = ['Group']
        #swagger.security = [{
            "bearerAuth": []
        }]
        #swagger.responses[200] = {
            description: "",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/groupAccountsSchema"
                    }
                }           
            }
        }   
        */
    }
    static async deleteAccount(req: Request, res: Response) {
        /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/groupAccountsInSchema"
                    }  
                }
            }
        } 
        */
       try {
          const { accountId } = req.body;
          const groupService = new GroupService();
          const accountsInGroup = await groupService.deleteAccount(accountId, req.params.id);

          res.status(200).json(accountsInGroup);
       } catch (error) {
          res.status(500).json({ "error": error.message });
       }
       /* 
        #swagger.tags = ['Group']
        #swagger.security = [{
            "bearerAuth": []
        }]
        #swagger.responses[200] = {
            description: "",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/groupAccountsSchema"
                    }
                }           
            }
        }   
        */
    }
    static async listAccount(req: Request, res: Response) {
        try {
          const groupService =  new GroupService();
          const group = await groupService.listAccount(req.params.id);

          res.status(200).json(group);
        } catch (error) {
          res.status(500).json({ "error": error.message });
        }
        /* 
        #swagger.tags = ['Group']
        #swagger.security = [{
            "bearerAuth": []
        }]
        #swagger.responses[200] = {
            description: "",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/groupDashboardsSchema"
                    }
                }           
            }
        }   
        */
    }
    static async addDashboard(req: Request, res: Response) {
        /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/groupDashboardsInSchema"
                    }  
                }
            }
        } 
        */
       try {
          const { dashboardId } = req.body;
          const groupService = new GroupService();
          const dashboardsInGroup = await groupService.addDashboard(dashboardId, req.params.id);

          res.status(200).json(dashboardsInGroup);
       } catch (error) {
          res.status(500).json({ "error": error.message });
       }
       /* 
        #swagger.tags = ['Group']
        #swagger.security = [{
            "bearerAuth": []
        }]
        #swagger.responses[200] = {
            description: "",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/groupDashboardsSchema"
                    }
                }           
            }
        }   
        */
    }
    static async deleteDashboard(req: Request, res: Response) {
        /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/groupDashboardsInSchema"
                    }  
                }
            }
        } 
        */
       try {
          const { dashboardId } = req.body;
          const groupService = new GroupService();
          const dashboardsInGroup = await groupService.deleteDashboard(dashboardId, req.params.id);

          res.status(200).json(dashboardsInGroup);
       } catch (error) {
          res.status(500).json({ "error": error.message });
       }
       /* 
        #swagger.tags = ['Group']
        #swagger.security = [{
            "bearerAuth": []
        }]
        #swagger.responses[200] = {
            description: "",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/groupDashboardsSchema"
                    }
                }           
            }
        }   
        */
    }
    static async listDashboard(req: Request, res: Response) {
        try {
          const groupService =  new GroupService();
          const group = await groupService.listDashboard(req.params.id);

          res.status(200).json(group);
        } catch (error) {
          res.status(500).json({ "error": error.message });
        }
        /* 
        #swagger.tags = ['Group']
        #swagger.security = [{
            "bearerAuth": []
        }]
        #swagger.responses[200] = {
            description: "",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/groupDashboardsSchema"
                    }
                }           
            }
        }   
        */
    }
}