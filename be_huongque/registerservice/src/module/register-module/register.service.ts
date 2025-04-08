import { Inject, Injectable } from '@nestjs/common';
import { IRegisterService, IRegisterRepository } from './register.port';
import { REGISTER_REPOSITORY } from './register.di-token';
import { Registration, RegisterCondDTO, ErrRegisterAlreadyExists, registerCondSchema, RegistrationStatus, RegisterUpdateDTO } from './register.entity';
import { v7 } from "uuid";
import { AppError } from 'src/share/app-error';
import { Paginated, PagingDTO } from 'src/share/data-model';
@Injectable()
export class RegisterService implements IRegisterService {
  // Additional methods for controller use
  constructor(
    @Inject(REGISTER_REPOSITORY)
    private readonly registerRepo: IRegisterRepository,
  ) {}
  async insert(dto: Registration): Promise<Registration> {
    await this.registerRepo.insert(dto);
    return dto;
  }
  async delete(id: string): Promise<void> {
    const registration = await this.registerRepo.findById(id);
    if (!registration) {
      throw AppError.from(new Error('Registration not found'), 404);
    }
    await this.registerRepo.delete(id);
  }

  async create(dto: Registration): Promise<string> {
    const data = registerCondSchema.parse(dto);
    
    // Check if registration with same email already exists
    if (dto.useremail) {
      const existingRegistration = await this.registerRepo.findByCond({ useremail: dto.useremail });
      if (existingRegistration) {
        throw AppError.from(ErrRegisterAlreadyExists, 400);
      }
    }

    const newId = v7();
    const now = new Date();
    
    const regis: Registration = {
      ...dto,
      registration_id: newId,
      status: RegistrationStatus.PENDING,
      createdAt: now,
      updatedAt: now
    };

    await this.registerRepo.insert(regis);

    return newId;
  }


  async update(dto: Registration): Promise<Registration> {
    const registration = await this.registerRepo.findById(dto.registration_id);
    if (!registration) {
      throw AppError.from(new Error('Registration not found'), 404);
    }
    
    const updateDto: RegisterUpdateDTO = {
      status: dto.status,
      note: dto.note
    };
    
    await this.registerRepo.update(dto.registration_id, updateDto);
    
    const updatedRegistration: Registration = {
      ...registration,
      ...dto,
      updatedAt: new Date()
    };
    
    return updatedRegistration;
  }

  // Additional methods to support controller operations
  async findById(id: string): Promise<Registration> {
    const registration = await this.registerRepo.findById(id);
    if (!registration) {
      throw AppError.from(new Error('Registration not found'), 404);
    }
    return registration;
  }

  async list(conditions: RegisterCondDTO, paging: PagingDTO): Promise<Paginated<Registration>> {
    return this.registerRepo.list(conditions, paging);
  }
}
