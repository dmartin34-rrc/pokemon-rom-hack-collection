import { PrismaClient } from '@prisma/client';
import { romSeedData } from './seedData';

const prisma = new PrismaClient();

async function main() {
  // clear table
  await prisma.rOM.deleteMany();

  await prisma.user.upsert({
    where: { clerkId: 'testuser01' },
    create: { clerkId: 'testuser01', username: 'testuser1' },
    update: {},
  });

  // insert roms to db
  const createManyRoms = await prisma.rOM.createManyAndReturn({
    data: romSeedData,
    skipDuplicates: true,
  });

  console.log(`CREATED ROMS: ${createManyRoms}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
