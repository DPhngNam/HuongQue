import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Tenant } from "./tenant.entity";
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @InjectRepository(Tenant)
    private tenantRepository: Repository<Tenant>,
  ) { }
  async onModuleInit() {
    // Read JSON file
    const filePath = path.resolve(__dirname, '../data/initialData.json');
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(rawData);

    const tenants = data.shop.map(shop => ({
      id: shop.id,
      name: shop.title,
      avatar: shop.image,
      address: shop.description, // or extract address from description if needed
      phone: '', // No phone in JSON, set as empty or extract if possible
      ShopDescription: shop.description,
      owner: null, // No owner in JSON, set as empty or extract if possible
      // created_at and updated_at will be set automatically by TypeORM
    }));

    await this.tenantRepository.save(tenants)
      .then(() => {
        console.log('Seed data inserted successfully');
      })
      .catch((error) => {
        console.error('Error inserting seed data:', error);
      });

    console.log('Seed data inserted');
  }
}