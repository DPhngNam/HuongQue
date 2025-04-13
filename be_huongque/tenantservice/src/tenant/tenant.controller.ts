import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TenantService } from './tenant.service';

@Controller('tenant')
export class TenantController {
    constructor(private readonly tenantService: TenantService){}

    @Post()
    async create(@Body() data:{
        name:string,
        domain:string
    }){
        return this.tenantService.create(data);
    }

    @Get()
    async findAll(){
        return this.tenantService.findAll();
    }
    @Get('domain/:domain')
    async findByDomain(@Param('domain') domain: string){
        return this.tenantService.findByDomain(domain);
    }
    @Get('id/:id')
    async findById(@Param('id') id: string){
        return this.tenantService.findById(id);
    }

}
