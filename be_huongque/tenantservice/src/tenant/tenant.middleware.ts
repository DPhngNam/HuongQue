import { Injectable, NestMiddleware } from "@nestjs/common";
import { TenantService } from "./tenant.service";
import { NextFunction,Request,Response } from "express";

@Injectable()
export class TenantMiddleware implements NestMiddleware {
    constructor(private readonly tenantService: TenantService) {}

    async use( req:Request, res: Response, next: NextFunction){
        const tenantId = req.params['tenantId'] 
        if (!tenantId) {
            return res.status(400).send('Tenant ID is required');
        }

        const tenant = await this.tenantService.findById(tenantId);
        if (!tenant) {
            return res.status(404).send('Tenant not found');
        }
        req['tenant'] = tenant; // Attach tenant to request object
        next();
    }
}
