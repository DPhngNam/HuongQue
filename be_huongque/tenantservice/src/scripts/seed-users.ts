import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tenant } from 'src/tenant/tenant.entity';


@Injectable()
export class SeederService {
  constructor(
    private readonly http: HttpService,
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
  ) {}

  async seedToAuth(){
    const tenants = await  this.tenantRepository.find();
    for(const tenant of tenants) {
      const dto = {
        email: `${tenant.phone}@seed.huongque.vn`,  
        password: 'HuongQue@123',                   
        enabled: true,
        role: 'TENANT'
      } 
      
      try{
        const res = await firstValueFrom(
          this.http.post(
            'localhost:8080/authservice/auth/system-register',
            dto,
          )
        );
        console.log(`Seeded user for tenant ${tenant.name}:`, res.data);
      } catch (error) {
        console.error(`Failed to seed user for tenant ${tenant.name}:`, error);
      }

    }
  }
}
