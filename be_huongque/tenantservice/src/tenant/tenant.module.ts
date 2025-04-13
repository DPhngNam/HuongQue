import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { TenantController } from './tenant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tenant } from './tenant.entity';
import { TenantMiddleware } from './tenant.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Tenant])],
  providers: [TenantService],
  controllers: [TenantController],
  exports: [TenantService],
})
export class TenantModule {
  configure(consumer: MiddlewareConsumer){
    consumer
    .apply(TenantMiddleware)
    .forRoutes({ path: 'tenant/:tenantId', method: RequestMethod.ALL})
  }
  
}
