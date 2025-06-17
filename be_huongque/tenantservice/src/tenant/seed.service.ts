import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Tenant } from "./tenant.entity";
import * as fs from 'fs';
import * as path from 'path';
import { ElasticsearchService } from "@nestjs/elasticsearch";

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @InjectRepository(Tenant)
    private tenantRepository: Repository<Tenant>,
    private readonly elasticService: ElasticsearchService,

  ) { }
  async onModuleInit() {
    // Read JSON file
    const filePath = path.resolve(__dirname, '../data/initialData.json');
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(rawData);

    const tenants = data.shop.map(shop => ({
      id: shop.shop_id, // Assuming shop_id is unique and can be used as id
      name: shop.shop_name,
      avatar: shop.shop_avatar,
      address: 'Quang Ninh', // or extract address from description if needed
      phone: '0123456789', // No phone in JSON, set as empty or extract if possible
      ShopDescription: shop.description,
      owner: null, // No owner in JSON, set as empty or extract if possible
      organization_info: shop.organization_info, // No organization info in JSON, set as empty or extract if possible
      created_at: new Date(), // Set current date for created_at
      updated_at: new Date(), // Set current date for updated_at
    }));
    await this.tenantRepository.clear();

    await this.tenantRepository.save(tenants)
      .then(async () => {
        console.log('Seed data inserted successfully');
        await this.seedElasticsearch(tenants);
      })
      .catch((error) => {
        console.error('Error inserting seed data:', error);
      });

    console.log('Seed data inserted');
  }

  async seedElasticsearch(tenants: Tenant[]) {
    if (!tenants || tenants.length === 0) {
      console.warn('No tenants to insert into Elasticsearch.');
      return;
    }


    const body = tenants.flatMap(tenant => [
      { index: { _index: 'tenants', _id: tenant.id.toString() } },
      {
        id: tenant.id,
        name: tenant.name,
        avatar: tenant.avatar,
        address: tenant.address,
        phone: tenant.phone,
        ShopDescription: tenant.ShopDescription,
        owner: tenant.owner,
      }
    ]);
    const maxRetries = 5;
    let attempt = 0;
    while (attempt < maxRetries) {
      try {
        await this.elasticService.bulk({ body, refresh: true });
        console.log(`Seeded ${tenants.length} tenants to Elasticsearch`);
        console.log('Elasticsearch seeded with tenant data');
        return;
      } catch (error) {
        attempt++;
        console.error(`Elasticsearch bulk insert failed (attempt ${attempt}):`, error.message);
        if (attempt >= maxRetries) {
          console.error('Max retries reached. Giving up.');
          break;
        }
        await new Promise(res => setTimeout(res, 3000)); // wait 3 seconds before retry
      }
    }
  }
}