import { Injectable,Inject } from '@nestjs/common';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { UpdateRegistrationDto } from './dto/update-registration.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RegistrationsService {
  constructor(@Inject("REGISTER_SERVICE") private rabbitClient: ClientProxy) {
    
  }
  create(createRegistrationDto: CreateRegistrationDto) {
    this.rabbitClient.emit('create_registration', createRegistrationDto);
    // this.rabbitClient.send('create_registration', createRegistrationDto).subscribe((response) => {
    
    return 'This action adds a new registration';
  }

  findAll() {
    return `This action returns all registrations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} registration`;
  }

  update(id: number, updateRegistrationDto: UpdateRegistrationDto) {
    return `This action updates a #${id} registration`;
  }

  remove(id: number) {
    return `This action removes a #${id} registration`;
  }
}
