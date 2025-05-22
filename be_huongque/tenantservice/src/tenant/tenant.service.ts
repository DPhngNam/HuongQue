import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tenant } from './tenant.entity';

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
  ) {}
  async create(data: Partial<Tenant>) {
    const tenant = this.tenantRepository.create(data);
    return this.tenantRepository.save(tenant);
  }
  async findAll() {
    return this.tenantRepository.find();
  }

  async findById(id: string) {
    return this.tenantRepository.findOne({ where: { id } });
  }

  async update(id: string, data: Partial<Tenant>) {
    await this.tenantRepository.update(id, data);
    return this.tenantRepository.findOne({ where: { id } });
  }

  async remove(id: string) {
    return this.tenantRepository.delete(id);
  }
}
