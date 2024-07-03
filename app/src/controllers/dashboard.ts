import { DashboardService } from "../services/dashboard";
import { Request, Response } from "express";
import { RequestUtils } from "../utils/request";

export class DashboardController {
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

            const dashboardService = new DashboardService();
            const dashboards = await dashboardService.findAll(
                page,
                amount,
                search,
                search_by,
                sort,
                sort_by
            );

            res.status(200).json(dashboards)
        } catch(error) {
            console.log(error);
            res.status(500).json({"error": error.message});
        }
        /* 
        #swagger.tags = ['Dashboard']
        #swagger.security = [{
            "bearerAuth": []
        }] 
        #swagger.responses[200] = {
            description: "",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/listDashboardSchema"
                    }
                }           
            }
        }   
        */
    }
    static async findById(req: Request, res: Response) {
        try {
          const dashboardService =  new DashboardService()
          const dashboard = await dashboardService.findById(req.params.id);

          res.status(200).json(dashboard);
        } catch (error) {
          res.status(500).json({ "error": error.message });
        }
        /* 
        #swagger.tags = ['Dashboard']
        #swagger.security = [{
            "bearerAuth": []
        }]
        #swagger.responses[200] = {
            description: "",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/dashboardSchema"
                    }
                }           
            }
        }   
        */
    }
    static async findByTitle(req: Request, res: Response) {
        try {
          const dashboardService =  new DashboardService();
          const dashboard = await dashboardService.findByTitle(req.params.title);

          res.status(200).json(dashboard);
        } catch (error) {
          res.status(500).json({ "error": error.message });
        }
        /* 
        #swagger.tags = ['Dashboard']
        #swagger.security = [{
            "bearerAuth": []
        }]
        #swagger.responses[200] = {
            description: "",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/dashboardSchema"
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
                        $ref: "#/components/schemas/dashboardInSchema"
                    }  
                }
            }
        } 
        #swagger.security = [{
            "bearerAuth": []
        }]
        #swagger.tags = ['Dashboard']
        */
        try {
            const {dashboard, kibana_id} = req.body;
            const dashboardService =  new DashboardService()
            const dashboardCreated = await dashboardService.create(kibana_id, dashboard);

            res.status(201).json(dashboardCreated);
        } catch(error) {
            console.log(`Debug: catch error = ${error}`)
            res.status(500).json({"error": error.message});
        }
        /* #swagger.responses[200] = {
            description: "",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/dashboardSchema"
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
                        $ref: "#/components/schemas/dashboardInSchema"
                    }  
                }
            }
        } 
        #swagger.security = [{
            "bearerAuth": []
        }]
        #swagger.tags = ['Dashboard']
        */
        try {
            const {dashboard, kibana_id} = req.body;
            const dashboardService =  new DashboardService()
            const dashboardUpdated = await dashboardService.update(req.params.id, kibana_id, dashboard);

            res.status(200).json(dashboardUpdated);
        } catch (error) {
            res.status(500).json({ "error": error.message });
        }
        /* #swagger.responses[200] = {
            description: "",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/dashboardSchema"
                    }
                }           
            }
        }   
        */
    }
    static async delete(req: Request, res: Response) {
        /*
        #swagger.tags = ['Dashboard']
        #swagger.security = [{
            "bearerAuth": []
        }]
        */
        try {
          const dashboardService =  new DashboardService()
          const dashboard = await dashboardService.delete(req.params.id);

          res.status(200).json(dashboard);
        } catch (error) {
          res.status(500).json({ "error": error.message });
        }
    }
}