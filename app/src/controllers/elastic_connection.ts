import { ElasticConnectionService } from "../services/elastic_connection";
import { Request, Response } from "express";
import { RequestUtils } from "../utils/request";

export class ElasticConnnectionConntroller {
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

            const elasticConnectionService = new ElasticConnectionService();
            const elasticConnections = await elasticConnectionService.findAll(
                page,
                amount,
                search,
                search_by,
                sort,
                sort_by
            );

            res.status(200).json(elasticConnections)
        } catch(error) {
            console.log(error);
            res.status(500).json({"error": error.message});
        }
        /* 
        #swagger.tags = ['Elasticsearch']
        #swagger.security = [{
            "bearerAuth": []
        }] 
        #swagger.responses[200] = {
            description: "",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/listElasticSchema"
                    }
                }           
            }
        }   
        */
    }
    static async findById(req: Request, res: Response) {
        try {
          const elasticConnectionService =  new ElasticConnectionService()
          const elasticConnection = await elasticConnectionService.findById(req.params.id);

          res.status(200).json(elasticConnection);
        } catch (error) {
          res.status(500).json({ "error": error.message });
        }
        /* 
        #swagger.tags = ['Elasticsearch']
        #swagger.security = [{
            "bearerAuth": []
        }]
        #swagger.responses[200] = {
            description: "",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/elasticSchema"
                    }
                }           
            }
        }   
        */
    }
    static async findByName(req: Request, res: Response) {
        try {
          const elasticConnectionService =  new ElasticConnectionService();
          const elasticConnection = await elasticConnectionService.findByName(req.params.connection_name);

          res.status(200).json(elasticConnection);
        } catch (error) {
          res.status(500).json({ "error": error.message });
        }
        /* 
        #swagger.tags = ['Elasticsearch']
        #swagger.security = [{
            "bearerAuth": []
        }]
        #swagger.responses[200] = {
            description: "",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/elasticSchema"
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
                        $ref: "#/components/schemas/elasticInSchema"
                    }  
                }
            }
        } 
        #swagger.security = [{
            "bearerAuth": []
        }]
        #swagger.tags = ['Elasticsearch']
        */
        try {
            const elasticConnectionService =  new ElasticConnectionService()
            const elasticConnectionCreated = await elasticConnectionService.create(req.body);

            res.status(201).json(elasticConnectionCreated);
        } catch(error) {
            console.log(`Debug: catch error = ${error}`)
            res.status(500).json({"error": error.message});
        }
        /* #swagger.responses[200] = {
            description: "",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/elasticSchema"
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
                        $ref: "#/components/schemas/elasticInSchema"
                    }  
                }
            }
        } 
        #swagger.security = [{
            "bearerAuth": []
        }]
        #swagger.tags = ['Elasticsearch']
        */
        try {
            const elasticConnectionService =  new ElasticConnectionService()
            const elasticConnection = await elasticConnectionService.update(req.params.id, req.body);

            res.status(200).json(elasticConnection);
        } catch (error) {
            res.status(500).json({ "error": error.message });
        }
        /* #swagger.responses[200] = {
            description: "",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/elasticSchema"
                    }
                }           
            }
        }   
        */
    }
    static async delete(req: Request, res: Response) {
        /*
        #swagger.tags = ['Elasticsearch']
        #swagger.security = [{
            "bearerAuth": []
        }]
        */
        try {
          const elasticConnectionService =  new ElasticConnectionService()
          const elasticConnection = await elasticConnectionService.delete(req.params.id);

          res.status(200).json(elasticConnection);
        } catch (error) {
          res.status(500).json({ "error": error.message });
        }
    }
}