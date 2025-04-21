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
  async findByDomain(domain: string) {
    return this.tenantRepository.findOne({ where: { domain } });
  }
  async findById(id: string) {
    return this.tenantRepository.findOne({ where: { id } });
  }
}
