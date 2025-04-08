import prisma from "src/share/prisma";
import { Registration, RegisterCondDTO, RegisterUpdateDTO, RegistrationStatus } from "./register.entity";
import { IRegisterRepository } from "./register.port";
import { RegistrationPrisma, RegistrationStatusPrisma } from "@prisma/client";
import { Paginated, PagingDTO } from "src/share/data-model";
import { Injectable } from "@nestjs/common";
import { ErrNotFound } from "src/share/app-error";

@Injectable()
export class RegistrationRepository implements IRegisterRepository {
    async findById(registration_id: string): Promise<Registration | null> {
        const registeration = await prisma.registrationPrisma.findFirst({
            where: { registration_id }
        });

        if (!registeration) return null;

        return this._toRegistration(registeration);
    }
    async list(dto: RegisterCondDTO, paging: PagingDTO): Promise<Paginated<Registration>> {
        const conditions: Record<string, any> = {};
        if (dto.registration_id) {
            conditions.registration_id = dto.registration_id
        }
        if (dto.useremail) {
            conditions.useremail = dto.useremail
        }
        if (dto.status) {
            conditions.status = dto.status
        }

        const total = await prisma.registrationPrisma.count({
            where: { ...conditions }
        })

        const skip = (paging.page - 1) * paging.limit;

        const result = await prisma.registrationPrisma.findMany({
            where: conditions,
            take: paging.limit,
            skip,
            orderBy: {
                registration_id: 'asc'
            }
        });

        return {
            data: result.map((item) => this._toRegistration(item)),
            paging: paging,
            total
        };

    }
    async findByCond(cond: RegisterCondDTO): Promise<Registration> {
        const conditions: Record<string, any> = {};
        if (cond.registration_id) {
            conditions.registration_id = cond.registration_id
        }
        if (cond.useremail) {
            conditions.useremail = cond.useremail
        }
        if (cond.status) {
            conditions.status = cond.status
        }

        const registeration = await prisma.registrationPrisma.findFirst({
            where: { ...conditions }
        });
        if (!registeration) throw ErrNotFound;
        return this._toRegistration(registeration);
    }
    async insert(dto: Registration): Promise<void> {
        const data: RegistrationPrisma = {
            ...dto,
            status: dto.status as string as RegistrationStatusPrisma, // Explicitly cast status
            note: dto.note ?? null, // Ensure note is null if undefined
        };
        await prisma.registrationPrisma.create({ data });
    }
    async update(registration_id: string, dto: RegisterUpdateDTO): Promise<void> {
        const registration = await prisma.registrationPrisma.findFirst({
            where: { registration_id }
        });

        if (!registration) {
            throw new Error('Registration not found');
        }

        // Create update data without including the status property from registration
        const { status: _, ...registrationWithoutStatus } = registration;

        const data: Partial<RegistrationPrisma> = {
            ...registrationWithoutStatus,
            ...dto,
            updatedAt: new Date(),
        };

        // Handle status separately
        if (dto.status !== undefined) {
            data.status = dto.status as string as RegistrationStatusPrisma;
        } else {
            data.status = registration.status; // Keep the original status
        }

        await prisma.registrationPrisma.update({
            where: { registration_id },
            data
        });
    }
    async delete(registration_id: string): Promise<void> {
        await prisma.registrationPrisma.delete({
            where: { registration_id }
        });
    }


    private _toRegistration(data: RegistrationPrisma): Registration {
        return { ...data, status: data.status as RegistrationStatus, note: data.note! } as Registration;
    }
}