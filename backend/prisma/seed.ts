import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.booking.deleteMany();
  await prisma.vehicle.deleteMany();
  await prisma.vehicleType.deleteMany();

  const types = await prisma.vehicleType.createMany({
    data: [
      { name: 'Hatchback', wheels: 4 },
      { name: 'SUV', wheels: 4 },
      { name: 'Cruiser', wheels: 2 },
    ],
  });

  const typeList = await prisma.vehicleType.findMany();

  for (const type of typeList) {
    await prisma.vehicle.createMany({
      data: [
        { name: `${type.name} Model A`, typeId: type.id },
        { name: `${type.name} Model B`, typeId: type.id },
      ],
    });
  }
}

main().finally(() => prisma.$disconnect());
