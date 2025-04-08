import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { RegisterService } from './register.service';
import { Registration, RegisterCondDTO, RegisterUpdateDTO } from './register.entity';
import { PagingDTO, Paginated } from 'src/share/data-model';

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  async createRegistration(@Body() registration: Registration): Promise<{ id: string }> {
    const id = await this.registerService.create(registration);
    return { id };
  }

  @Put(':id')
  async updateRegistration(
    @Param('id') id: string,
    @Body() registration: Registration
  ): Promise<Registration> {
    return this.registerService.update({
      ...registration,
      registration_id: id
    });
  }

  @Delete(':id')
  async deleteRegistration(@Param('id') id: string): Promise<void> {
    return this.registerService.delete(id);
  }

  @Get(':id')
  async getRegistrationById(@Param('id') id: string): Promise<Registration> {
    // Assuming findById is exposed through the service
    // If not, you might need to add this method to the service
    const registration = await this.registerService.findById(id);
    return registration;
  }

  @Get()
  async listRegistrations(
    @Query() conditions: RegisterCondDTO,
    @Query() paging: PagingDTO
  ): Promise<Paginated<Registration>> {
    // Assuming list is exposed through the service
    // If not, you might need to add this method to the service
    return this.registerService.list(conditions, paging);
  }
}
