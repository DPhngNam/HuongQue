import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Registration } from './entities/registration.entity';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { UpdateRegistrationDto } from './dto/update-registration.dto';

@Injectable()
export class RegistrationsService {
  constructor(
    @InjectRepository(Registration)
    private registrationRepository: Repository<Registration>,
  ) { }

  create(createRegistrationDto: CreateRegistrationDto) {
    return this.registrationRepository.save(createRegistrationDto);
  }

  async findAll(page: number = 1, limit: number = 10): Promise<{
    data: Registration[];
    total: number;
    page: number;
    lastPage: number;
  }> {
    const [data, total] = await this.registrationRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return {
      data,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  findOne(id: string) {
    return this.registrationRepository.findOne({ where: { registration_id: id } });
  }

  update(id: string, updateRegistrationDto: UpdateRegistrationDto) {
    return this.registrationRepository.update(id, updateRegistrationDto);
  }

  remove(id: string) {
    return this.registrationRepository.delete(id);
  }
}
