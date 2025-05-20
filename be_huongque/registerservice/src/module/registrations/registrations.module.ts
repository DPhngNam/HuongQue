import { Module } from '@nestjs/common';
import { RegistrationsController } from './registrations.controller';
import { RegistrationsService } from './registrations.service';
import { RabbitmqModule } from '../rabbitmq/rabbitmq.module';
@Module({
  imports: [RabbitmqModule],
  controllers: [RegistrationsController],
  providers: [RegistrationsService]
})
export class RegistrationsModule {}
