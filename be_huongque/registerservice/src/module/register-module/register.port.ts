import { Paginated, PagingDTO } from 'src/share/data-model';
import { RegisterCondDTO, RegisterUpdateDTO, Registration } from './register.entity';

export interface IRegisterRepository extends IRegisterQueryRepository, IRegisterCommandRepository {}
export interface IRegisterService {
  create(dto: Registration): Promise<string>;
  update(dto: Registration): Promise<Registration>;
  insert(dto: Registration): Promise<Registration>;
  delete(id: string): Promise<void>;
}
export interface IRegisterQueryRepository {
  findById(id: string): Promise<Registration | null>;
  list(dto: RegisterCondDTO,paging: PagingDTO):  Promise<Paginated<Registration>>;
  findByCond(cond: RegisterCondDTO): Promise<Registration>;
}
export interface IRegisterCommandRepository {
  insert(dto: Registration):Promise<void>;
  update(registration_id: string, dto: RegisterUpdateDTO): Promise<void>;
  delete(registration_id: string): Promise<void>;
}