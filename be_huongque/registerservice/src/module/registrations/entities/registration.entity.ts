import { IsNotEmpty, IsString, IsEmail, IsOptional, IsEnum, IsDate, IsUUID } from 'class-validator';
import { ApiProperty, ApiConsumes } from '@nestjs/swagger';
import { RegistrationStatus } from '../dto/create-registration.dto';
export class Registration {
    @IsUUID()
    @ApiProperty({ description: 'Registration ID', example: 'uuid-string' })
    registration_id?: string;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        description: 'User email address',
        example: 'user@example.com',
        format: 'email'
    })
    useremail: string;

    @IsNotEmpty()
    @ApiProperty({
        description: 'Store documentation images',
        type: 'array',
        items: {
            type: 'string',
            format: 'binary'
        },
        required: true
    })
    image: String[];

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

    @IsString()
    @IsOptional()
    note: string;

    @IsEnum(RegistrationStatus)
    @IsOptional()
    status: RegistrationStatus;

    @IsDate()
    @IsOptional()
    createdAt: Date;

    @IsDate()
    @IsOptional()
    updatedAt: Date;
    
}
