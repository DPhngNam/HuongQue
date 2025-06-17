import { ApiConsumes, ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
  Matches,
  MinLength,
  MaxLength
} from 'class-validator';
import { Type } from 'class-transformer';
import { BusinessModel } from '../entities/business-model.enum';

export enum RegistrationStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

class BankAccountDto {
  @IsString()
  @Matches(/^[0-9]+$/, { message: 'Số tài khoản chỉ được chứa chữ số' })
  @MinLength(10)
  @MaxLength(20)
  @ApiProperty()
  accountNumber: string;

  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @ApiProperty()
  accountName: string;

  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @ApiProperty()
  bankName: string;

  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @ApiProperty()
  branch: string;
}

@ApiConsumes('multipart/form-data')
export class CreateRegistrationDto {
  // Phase 1
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  useremail: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @ApiProperty()
  name: string;

  @IsString()
  @Matches(/^(03|05|07|08|09)[0-9]{8}$/, {
    message: 'Số điện thoại không hợp lệ. VD: 0912345678',
  })
  @ApiProperty()
  phone: string;

  // Phase 2
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @ApiProperty()
  store_name: string;

  @IsString()
  @MinLength(5)
  @MaxLength(200)
  @ApiProperty()
  store_address: string;

  @IsOptional()
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  avatar?: any;

  @IsOptional()
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  banner?: any;

  @IsString()
  @MinLength(10)
  @MaxLength(1000)
  @ApiProperty()
  description: string;

  @IsEnum(BusinessModel)
  @ApiProperty({ enum: BusinessModel })
  business_model: BusinessModel;

  // Phase 3
  @ValidateNested()
  @Type(() => BankAccountDto)
  @ApiProperty({ type: BankAccountDto })
  bankAccount: BankAccountDto;

  @ApiProperty({ type: 'string', format: 'binary' })
  idCard: any;

  @ApiProperty({ type: 'string', format: 'binary' })
  businessLicense: any;

  @ApiProperty({ type: 'string', format: 'binary' })
  foodSafetyCertificate: any;

  // This is your original file list (optional if you already use fields above)
  @ApiProperty({
    type: 'string',
    format: 'binary',
    isArray: true,
    required: false,
  })
  image?: any;
}
