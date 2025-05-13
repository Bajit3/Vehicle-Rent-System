import { CreateBookingDTO } from "../dtos/CreateBookingDTO";
import { prisma } from "../utils/prisma";

export const createBooking = async (data: CreateBookingDTO) => {
  const overlapping = await prisma.booking.findFirst({
    where: {
      vehicleId: data.vehicleId,
      OR: [
        {
          startDate: { lte: new Date(data.endDate) },
          endDate: { gte: new Date(data.startDate) },
        },
      ],
    },
  });

  if (overlapping) throw new Error("Booking date conflicts with an existing booking.");

  return await prisma.booking.create({ data });
};
