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
  ) {}

  create(createRegistrationDto: CreateRegistrationDto) {
    return this.registrationRepository.save(createRegistrationDto);
  }

  findAll() {
    return this.registrationRepository.find();
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
