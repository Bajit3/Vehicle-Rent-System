import { z } from 'zod';

export const bookingSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  wheels: z
    .string()
    .transform(Number)
    .refine((val) => val === 2 || val === 4, {
      message: 'Please select 2 or 4 wheels',
    }),
  typeId: z.string().uuid('Select a valid vehicle type'),
  vehicleId: z.string().uuid('Select a vehicle model'),
  startDate: z.date(),
  endDate: z.date(),
});
