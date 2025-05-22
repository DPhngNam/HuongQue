import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';
import { RegistrationStatus } from '../dto/create-registration.dto';
import { BusinessModel } from './business-model.enum';
export class Registration {
    @PrimaryGeneratedColumn('uuid')
    @IsUUID()
    @ApiProperty({ description: 'Registration ID', example: 'uuid-string' })
    registration_id?: string;

    @IsEmail()
    @Column({ type: 'varchar', length: 255, nullable: false })
    @IsNotEmpty()
    @ApiProperty({
        description: 'User email address',
        example: 'user@example.com',
        format: 'email'
    })
    tenant_email: string;

    @IsString()
    @IsNotEmpty()
    @Column({ type: 'varchar', length: 255, nullable: false })
    @ApiProperty({
        description: 'Name of the store',
        example: 'My Store Name',
        minLength: 1
    })
    tenant_name: string;

    @IsString()
    @IsNotEmpty()
    @Column({ type: 'varchar', length: 255, nullable: false })
    @ApiProperty({
        description: 'Physical address of the store',
        example: '123 Store Street, City, Country',
        minLength: 1
    })
    tenant_address: string;

    @IsString()
    @IsNotEmpty()
    @Column({ type: 'varchar', length: 20, nullable: false })
    @ApiProperty({
        description: 'Store contact phone number',
        example: '+84123456789',
        minLength: 1
    })
    tenant_sdt: string;

    @IsString()
    @IsOptional()
    @Column({ type: 'varchar', length: 255, nullable: true })
    @ApiProperty({ description: 'Optional note' })
    note: string;

    @IsEnum(RegistrationStatus)
    @IsNotEmpty()
    @Column({ type: 'enum', enum: RegistrationStatus, nullable: false })
    @ApiProperty({ description: 'Registration status', enum: RegistrationStatus })
    status: RegistrationStatus;

    @CreateDateColumn()
    @ApiProperty({ description: 'Creation date', type: Date, required: false })
    createdAt?: Date;

    @UpdateDateColumn()
    @ApiProperty({ description: 'Update date', type: Date, required: false })
    updatedAt?: Date;

    @ApiProperty({ description: 'Store description' })
    @IsOptional()
    @IsString()
    @Column({ type: 'varchar', length: 500, nullable: true })
    tenant_description: string;

    @ApiProperty({ description: 'Store logo URL', required: false })
    @IsOptional()
    @IsString()
    @Column({ type: 'varchar', length: 255, nullable: true })
    tenant_logo: string;

    @ApiProperty({ description: 'Store banner URL', required: false })
    @IsOptional()
    @IsString()
    @Column({ type: 'varchar', length: 255, nullable: true })
    tenant_banner: string;

    @ApiProperty({ description: 'Citizen ID image URL (CCCD)', required: false })
    @IsNotEmpty()
    @IsString()
    @Column({ type: 'varchar', length: 255, nullable: false })
    cccd_image?: string;

    @ApiProperty({ description: 'Business license image URL', required: false })
    @IsNotEmpty()
    @IsString()
    @Column({ type: 'varchar', length: 255, nullable: false })
    business_license_image?: string;

    @ApiProperty({ description: 'Food safety certificate image URL', required: false })
    @IsNotEmpty()
    @IsString()
    @Column({ type: 'varchar', length: 255, nullable: false })
    food_safety_certificate_image?: string;

    @ApiProperty({ description: 'Business model', enum: BusinessModel })
    @IsEnum(BusinessModel)
    @Column({ type: 'enum', enum: BusinessModel, nullable: false })
    business_model: BusinessModel;
}
