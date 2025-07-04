import { Injectable, OnModuleInit } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { shops } from '../data/initialData'; // Adjust the path as necessary
import { Tenant } from './tenant.entity';
import { v4 as uuidv4 } from 'uuid';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @InjectRepository(Tenant)
    private tenantRepository: Repository<Tenant>,
    private readonly elasticService: ElasticsearchService,
    private readonly http: HttpService,
  ) { }
  async onModuleInit() {
    const data = shops;
    const tenants = data.map((shop,index) => ({
      id: shop.shop_id && shop.shop_id !== '' ? shop.shop_id : uuidv4(),
      name: shop.shop_name,
      avatar: shop.shop_avatar,
      address: 'Quang Ninh', // or extract address from description if needed
      phone: `012345${String(index).padStart(4, '0')}`,
      ShopDescription: shop.description,
      owner: shop.shop_id, // No owner in JSON, set as empty or extract if possible
      organization_info: shop.organization_info, // No organization info in JSON, set as empty or extract if possible
      created_at: new Date(), // Set current date for created_at
      updated_at: new Date(), // Set current date for updated_at
    }));
    await this.tenantRepository.clear();

    await this.tenantRepository
      .save(tenants)
      .then(async () => {
        await this.seedElasticsearch(tenants);
      })
      .catch((error) => {
        console.error('Error saving tenants to database:', error);
      });

    await this.seedToAuth().then(() => {
      console.log('Seeded tenants and their auth users successfully.');
    });
    // console.log('Seed auth users for tenants');
  }

  async seedElasticsearch(tenants: Tenant[]) {
    if (!tenants || tenants.length === 0) {
      console.warn('No tenants to insert into Elasticsearch.');
      return;
    }

    const body = tenants.flatMap((tenant) => [
      { index: { _index: 'tenants', _id: tenant.id.toString() } },
      {
        id: tenant.id,
        name: tenant.name,
        avatar: tenant.avatar,
        address: tenant.address,
        phone: tenant.phone,
        ShopDescription: tenant.ShopDescription,
        owner: tenant.owner,
      },
    ]);
    const maxRetries = 5;
    let attempt = 0;
    while (attempt < maxRetries) {
      try {
        await this.elasticService.bulk({ body, refresh: true });
        return;
      } catch (error) {
        attempt++;
        if (attempt >= maxRetries) {
          break;
        }
        await new Promise((res) => setTimeout(res, 3000)); // wait 3 seconds before retry
      }
    }
  }
  async seedToAuth() {
    const tenants = await this.tenantRepository.find();
    const maxRetries = 5;
    const baseDelay = 5000; // 5 seconds

    for (const tenant of tenants) {
      // Generate unique email using tenant ID to avoid conflicts
      const dto = {
        email: `tenant-${tenant.id}@seed.huongque.vn`,
        password: 'HuongQue@123',
        enabled: true,
        role: 'TENANT',
      };

      let attempt = 0;
      let success = false;

      while (attempt < maxRetries && !success) {
        try {
          const res = (await firstValueFrom(
            this.http.post(
              'http://authservice:8081/auth/system-register',
              dto,
            ),
          )) as { data: { id: string } };

          const userId = res.data.id;
          if (userId) {
            tenant.owner = userId;
            await this.tenantRepository.save(tenant);
            console.log(
              `✅ Seeded user for tenant ${tenant.name}, ownerId: ${userId}`,
            );
            success = true;
          }
        } catch (error) {
          attempt++;
          const delay = baseDelay * Math.pow(2, attempt - 1); // Exponential backoff
          console.warn(
            `❌ Attempt ${attempt}/${maxRetries} failed for tenant ${tenant.name}. Retrying in ${delay}ms...`,
            error.response?.data || error.message
          );

          if (attempt < maxRetries) {
            await new Promise(resolve => setTimeout(resolve, delay));
          } else {
            console.error(
              `💥 Failed to seed user for tenant ${tenant.name} after ${maxRetries} attempts:`,
              error.response?.data || error.message
            );
          }
        }
      }
    }
  }
}
