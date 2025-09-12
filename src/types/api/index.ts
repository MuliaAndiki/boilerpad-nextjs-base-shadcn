import { z } from 'zod';

export const userType = z.object({
  user: z.object({
    _id: z.string(),
    role: z.string(),
    token: z.string(),
    methotPayment: z.string(),
    provinsi: z.string(),
    fullName: z.string(),
    email: z.string(),
    phoneNumber: z.string().regex(/^(\+62|0)8[1-9][0-9]{6,9}$/, 'Nomor HP tidak valid'),
    password: z.string(),
    fotoProfile: z.string().nullable().optional(),
    isVerified: z.boolean(),
  }),
});

export type userSchema = z.infer<typeof userType>;
