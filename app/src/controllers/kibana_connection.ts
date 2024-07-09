import { KibanaConnectionService } from "../services/kibana_connection";
import { Request, Response } from "express";
import { RequestUtils } from "../utils/request";

export class KibanaConnnectionConntroller {
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

            const kibanaConnectionService = new KibanaConnectionService();
            const kibanaConnections = await kibanaConnectionService.findAll(
                page,
                amount,
                search,
                search_by,
                sort,
                sort_by
            );

            res.status(200).json(kibanaConnections)
        } catch(error) {
            console.log(error);
            res.status(500).json({"error": error.message});
        }
        /* 
        #swagger.tags = ['Kibana']
        #swagger.security = [{
            "bearerAuth": []
        }] 
        #swagger.responses[200] = {
            description: "",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/listKibanaSchema"
                    }
                }           
            }
        }   
        */
    }
    static async findById(req: Request, res: Response) {
        try {
          const kibanaConnectionService =  new KibanaConnectionService()
          const kibanaConnection = await kibanaConnectionService.findById(req.params.id);

          res.status(200).json(kibanaConnection);
        } catch (error) {
          res.status(500).json({ "error": error.message });
        }
        /* 
        #swagger.tags = ['Kibana']
        #swagger.security = [{
            "bearerAuth": []
        }]
        #swagger.responses[200] = {
            description: "",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/kibanaSchema"
                    }
                }           
            }
        }   
        */
    }
    static async findByName(req: Request, res: Response) {
        try {
          const kibanaConnectionService =  new KibanaConnectionService();
          const kibanaConnection = await kibanaConnectionService.findByName(req.params.connection_name);

          res.status(200).json(kibanaConnection);
        } catch (error) {
          res.status(500).json({ "error": error.message });
        }
        /* 
        #swagger.tags = ['Kibana']
        #swagger.security = [{
            "bearerAuth": []
        }]
        #swagger.responses[200] = {
            description: "",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/kibanaSchema"
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
                        $ref: "#/components/schemas/kibanaInSchema"
                    }  
                }
            }
        } 
        #swagger.security = [{
            "bearerAuth": []
        }]
        #swagger.tags = ['Kibana']
        */
        try {
            const kibanaConnectionService =  new KibanaConnectionService()
            const kibanaConnectionCreated = await kibanaConnectionService.create(req.body);

            res.status(201).json(kibanaConnectionCreated);
        } catch(error) {
            console.log(`Debug: catch error = ${error}`)
            res.status(500).json({"error": error.message});
        }
        /* #swagger.responses[200] = {
            description: "",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/kibanaSchema"
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
                        $ref: "#/components/schemas/kibanaInSchema"
                    }  
                }
            }
        } 
        #swagger.security = [{
            "bearerAuth": []
        }]
        #swagger.tags = ['Kibana']
        */
        try {
            const kibanaConnectionService =  new KibanaConnectionService()
            const kibanaConnection = await kibanaConnectionService.update(req.params.id, req.body);

            res.status(200).json(kibanaConnection);
        } catch (error) {
            res.status(500).json({ "error": error.message });
        }
        /* #swagger.responses[200] = {
            description: "",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/kibanaSchema"
                    }
                }           
            }
        }   
        */
    }
    static async delete(req: Request, res: Response) {
        /*
        #swagger.tags = ['Kibana']
        #swagger.security = [{
            "bearerAuth": []
        }]
        */
        try {
          const kibanaConnectionService =  new KibanaConnectionService()
          const kibanaConnection = await kibanaConnectionService.delete(req.params.id);

          res.status(200).json(kibanaConnection);
        } catch (error) {
          res.status(500).json({ "error": error.message });
        }
    }
}