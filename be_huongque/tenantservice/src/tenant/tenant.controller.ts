import { Body, Controller, Get, Post } from '@nestjs/common';
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
    @Get(':domain')
    async findByDomain(@Body('domain') domain: string){
        return this.tenantService.findByDomain(domain);
    }
    @Get(':id')
    async findById(@Body('id') id: string){
        return this.tenantService.findById(id);
    }
    
}
