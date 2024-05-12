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
}