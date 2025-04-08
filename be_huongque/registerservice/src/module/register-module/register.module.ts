import { Module } from '@nestjs/common';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';
import { RegistrationRepository } from './register.repository';
import { REGISTER_REPOSITORY, REGISTER_SERVICE } from './register.di-token';

@Module({
  controllers: [RegisterController],
  providers: [
    {
      provide: REGISTER_SERVICE,
      useClass: RegisterService,
    },
    {
      provide: REGISTER_REPOSITORY,
      useClass: RegistrationRepository,
    },
    RegisterService, // Also provide directly for controller injection
  ],
  exports: [REGISTER_SERVICE],
})
export class RegisterModule {}