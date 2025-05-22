import { ApiConsumes, ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { BusinessModel } from '../entities/business-model.enum';


export enum RegistrationStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED'
}

@ApiConsumes('multipart/form-data')
export class CreateRegistrationDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        description: 'User email address',
        example: 'user@example.com',
        format: 'email'
    })
    useremail: string;
    @ApiProperty({
        type: 'string',
        format: 'binary',
        description: 'Upload one or more image files',
        isArray: true,
        required: true,
    })
    image: any;


    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Name of the store',
        example: 'My Store Name',
        minLength: 1
    })
    store_name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Physical address of the store',
        example: '123 Store Street, City, Country',
        minLength: 1
    })
    store_address: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Store contact phone number',
        example: '+84123456789',
        minLength: 1
    })
    store_sdt: string;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Store email address for business communications',
        example: 'store@business.com',
        format: 'email'
    })
    store_email: string;

    @ApiProperty({ description: 'Business model', enum: BusinessModel })
    @IsEnum(BusinessModel)
    business_model: BusinessModel;
}
