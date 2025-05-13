import { prisma } from "../utils/prisma";

export const getTypesByWheels = async (wheels: number) => {
  return await prisma.vehicleType.findMany({ where: { wheels } });
};

export const getVehiclesByType = async (typeId: string) => {
  return await prisma.vehicle.findMany({ where: { typeId } });
};
