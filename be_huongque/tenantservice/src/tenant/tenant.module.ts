import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { TenantController } from './tenant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tenant } from './tenant.entity';
import { TenantMiddleware } from './tenant.middleware';
import { SeedService } from './seed.service';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tenant]), 
    ElasticsearchModule.register({
      node: 'http://elasticsearch:9200',
    }),
  ],
  providers: [TenantService, SeedService],
  controllers: [TenantController],
  exports: [TenantService,SeedService],
})
export class TenantModule {
  configure(consumer: MiddlewareConsumer){
    consumer
    .apply(TenantMiddleware)
    .forRoutes({ path: 'tenant/:tenantId', method: RequestMethod.ALL})
  }
  
}
