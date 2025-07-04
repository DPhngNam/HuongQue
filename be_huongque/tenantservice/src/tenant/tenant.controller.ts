import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TenantService } from './tenant.service';
import { Tenant } from './tenant.entity';

@Controller('tenant')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Post()
  async create(
    @Body()
    data: {
      name: string;
      avatar: string;
      address: string;
      phone: string;
      ShopDescription: string;
      ownerId: string;
    },
  ) {
    // Gán owner từ ownerId (TypeORM ManyToOne cần object id)
    const { ownerId, ...tenantData } = data;
    return this.tenantService.create({
      ...tenantData,
      owner: { id: ownerId } as any,
    });
  }

  @Get()
  async findAll() {
    return this.tenantService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.tenantService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Partial<Tenant>) {
    return this.tenantService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.tenantService.remove(id);
  }

  @Get('owner/:ownerId')
  async findByOwnerId(@Param('ownerId') ownerId: string) {
    return this.tenantService.findByOwnerId(ownerId);
  }
}
