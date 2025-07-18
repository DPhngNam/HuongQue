import { PartialType ,OmitType} from '@nestjs/mapped-types';
import { CreateRegistrationDto } from './create-registration.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsEnum, IsString } from 'class-validator';
import { RegistrationStatus } from '../dto/create-registration.dto';

const UpdatableRegistrationBase = OmitType(CreateRegistrationDto, [
  'avatar', 'banner', 'idCard', 'businessLicense', 'foodSafetyCertificate',
] as const);

export class UpdateRegistrationDto extends PartialType(CreateRegistrationDto) {
@IsOptional()
  @IsEnum(RegistrationStatus)
  @ApiProperty({ description: 'Current registration status', enum: RegistrationStatus, required: false })
  status?: RegistrationStatus;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Optional note about the registration', example: 'Additional documents provided.' })
  note?: string;
}
