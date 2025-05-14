import { CreateBookingDTO } from "../dtos/CreateBookingDTO";
import { prisma } from "../utils/prisma";

export const createBooking = async (data: CreateBookingDTO) => {
  const startDate = new Date(data.startDate);
  const endDate = new Date(data.endDate);

  const overlapping = await prisma.booking.findFirst({
    where: {
      vehicleId: data.vehicleId,
      OR: [
        {
          startDate: { lte: endDate },
          endDate: { gte: startDate },
        },
      ],
    },
  });

  if (overlapping) {
    throw new Error(
      `This vehicle is already booked from ${overlapping.startDate.toISOString().split('T')[0]} to ${overlapping.endDate.toISOString().split('T')[0]}`
    );
  }

  return await prisma.booking.create({ 
    data: {
      ...data,
      startDate,
      endDate
    } 
  });
};
