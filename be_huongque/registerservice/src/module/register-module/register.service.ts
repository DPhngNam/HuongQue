import { Inject, Injectable } from '@nestjs/common';
import { IRegisterService } from './register.port';
import { REGISTER_REPOSITORY } from './register.di-token';
import { Registration,RegisterCondDTO,ErrRegisterAlreadyExists } from './register.entity';
import { v7 } from "uuid";
@Injectable()
export class RegisterService implements IRegisterService {
  constructor(
    @Inject(REGISTER_REPOSITORY)
    private readonly registerRepo: IRegisterService,
  ) {}
  insert(dto: Registration): Promise<Registration> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async create(dto: Registration): Promise<string> {
    const data = RegisterCondDTO.parse(dto);
    const topicExist = await this.registerRepo.findById({ name: data.name });

    if (topicExist) {
      throw AppError.from(ErrRegisterAlreadyExists, 400);
    }

    const newId = v7();
    const regis: Registration = {
      
    };

    await this.registerRepo.insert(regis);

    return newId;

  }


  async update(dto: Registration): Promise<Registration> {
    throw new Error('Method not implemented.');
  }
}
