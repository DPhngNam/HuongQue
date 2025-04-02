import z from 'zod';

export enum RegistrationStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export const ErrInvalidContent = new Error(
  'Content must be at least 1 character long',
);
export const ErrCannotEmpty = new Error('Content cannot be empty');
export const ErrInvalidId = new Error('Invalid id');
export const ErrRegistrationNotFound = new Error('Registration not found');
export const ErrRegisterAlreadyExists = new Error('')

export const RegistrationSchema = z.object({
  registration_id: z.string().uuid(),
  useremail: z.string().email(),
  image: z.array(z.string()),
  store_name: z.string(),
  store_address: z.string(),
  store_sdt: z
    .string()
    .min(10, ErrInvalidContent.message) 
    .max(11, ErrInvalidContent.message),
  store_email: z.string().email(),
  note: z.string().optional(),
  status: z.nativeEnum(RegistrationStatus).default(RegistrationStatus.PENDING),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Registration = z.infer<typeof RegistrationSchema>;

export const registerUpdateSchema = RegistrationSchema.pick({
  status: true,
  note: true,
});

export type RegisterUpdateDTO = z.infer<typeof registerUpdateSchema>;

export const registerCondSchema = RegistrationSchema.pick({
  registration_id: true,
  useremail: true,
  status:true
}).partial();

export type RegisterCondDTO = z.infer<typeof registerCondSchema>;
