import { LogstashSettingService } from "../services/logstash_setting";
import { Request, Response } from "express";
import { RequestUtils } from "../utils/request";

export class LogstashSettingController {
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

            const logstashSettingService = new LogstashSettingService();
            const logstashSettings = await logstashSettingService.findAll(
                page,
                amount,
                search,
                search_by,
                sort,
                sort_by
            );

            res.status(200).json(logstashSettings)
        } catch(error) {
            console.log(error);
            res.status(500).json({"error": error.message});
        }
        /* 
        #swagger.tags = ['Logstash']
        #swagger.security = [{
            "bearerAuth": []
        }] 
        #swagger.responses[200] = {
            description: "",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/listLogstashSchema"
                    }
                }           
            }
        }   
        */
    }
    static async findById(req: Request, res: Response) {
        try {
          const logstashSettingService =  new LogstashSettingService()
          const logstashSetting = await logstashSettingService.findById(req.params.id);

          res.status(200).json(logstashSetting);
        } catch (error) {
          res.status(500).json({ "error": error.message });
        }
        /* 
        #swagger.tags = ['Logstash']
        #swagger.security = [{
            "bearerAuth": []
        }]
        #swagger.responses[200] = {
            description: "",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/logstashSchema"
                    }
                }           
            }
        }   
        */
    }
    static async findByName(req: Request, res: Response) {
        try {
          const logstashSettingService =  new LogstashSettingService();
          const logstashSetting = await logstashSettingService.findByName(req.params.connection_name);

          res.status(200).json(logstashSetting);
        } catch (error) {
          res.status(500).json({ "error": error.message });
        }
        /* 
        #swagger.tags = ['Logstash']
        #swagger.security = [{
            "bearerAuth": []
        }]
        #swagger.responses[200] = {
            description: "",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/logstashSchema"
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
                        $ref: "#/components/schemas/logstashInSchema"
                    }  
                }
            }
        } 
        #swagger.security = [{
            "bearerAuth": []
        }]
        #swagger.tags = ['Logstash']
        */
        try {
            const logstashSetting = req.body;
            
            const logstashSettingService =  new LogstashSettingService();
            const { newLogstashSetting, configData } = await logstashSettingService.create(logstashSetting);

            const scpClient = await logstashSettingService.scpConnect(logstashSetting.ip, logstashSetting.username, logstashSetting.password);
            await logstashSettingService.save(scpClient, logstashSetting.directory, logstashSetting.connection_name, configData);

            res.status(201).json(newLogstashSetting);
        } catch(error) {
            //cari error type scp
            console.log(`Debug: catch error = ${error}`)
            res.status(500).json({"error": error.message});
        }
        /* #swagger.responses[200] = {
            description: "",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/logstashSchema"
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
                        $ref: "#/components/schemas/logstashInSchema"
                    }  
                }
            }
        } 
        #swagger.security = [{
            "bearerAuth": []
        }]
        #swagger.tags = ['Logstash']
        */
        try {
            const logstashSettingService =  new LogstashSettingService();
            const logstashSetting = await logstashSettingService.update(req.params.id, req.body);

            res.status(200).json(logstashSetting);
        } catch (error) {
            res.status(500).json({ "error": error.message });
        }
        /* #swagger.responses[200] = {
            description: "",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/logstashSchema"
                    }
                }           
            }
        }   
        */
    }
    static async delete(req: Request, res: Response) {
        /*
        #swagger.tags = ['Logstash']
        #swagger.security = [{
            "bearerAuth": []
        }]
        */
        try {
          const logstashSettingService =  new LogstashSettingService();
          const logstashSetting = await logstashSettingService.delete(req.params.id);

          res.status(200).json(logstashSetting);
        } catch (error) {
          res.status(500).json({ "error": error.message });
        }
    }
    static async retry(req: Request, res: Response) {
        /*
        #swagger.tags = ['Logstash']
        #swagger.security = [{
            "bearerAuth": []
        }]
        */
        try {
            const logstashSettingService = new LogstashSettingService();
            const { logstashSetting, configData } = await logstashSettingService.retry(req.params.id);
            const scpClient = await logstashSettingService.scpConnect(logstashSetting.ip, logstashSetting.username, logstashSetting.password);
            await logstashSettingService.save(scpClient, logstashSetting.directory, logstashSetting.connection_name, configData);

            res.status(200).json(logstashSetting);
        } catch (error) {
            res.status(500).json({ "error": error.message });
        }
        /* #swagger.responses[200] = {
            description: "",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/logstashSchema"
                    }
                }           
            }
        }   
        */
    }
}