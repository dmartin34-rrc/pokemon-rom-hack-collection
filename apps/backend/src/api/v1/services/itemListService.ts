import prisma from '../../../../prisma/client';

const getValidTitles = async (): Promise<string[]> => {
  const roms = await prisma.rOM.findMany({
    select: { title: true },
  });

  return roms.map((rom) => rom.title).filter(Boolean);
};

const getItems = async (page: string, userId: number): Promise<string[]> => {
  const roms = await prisma.itemList.findMany({
    where: { page, userId },
    include: {
      rom: {
        select: { title: true },
      },
    },
  });

  return roms.map((r) => r.rom.title).filter(Boolean);
};

const addItem = async (
  page: string,
  title: string,
  userId: number,
): Promise<string[]> => {
  const currentItems = await getItems(page, userId);
  const validTitles = await getValidTitles();

  if (currentItems.includes(title) || !validTitles.includes(title)) {
    return currentItems;
  }

  const rom = await prisma.rOM.findFirst({
    where: { title },
    select: { id: true },
  });

  if (!rom) {
    return currentItems;
  }

  await prisma.itemList.createMany({
    data: [{ page, romId: rom.id, userId }],
  });

  return getItems(page, userId);
};

const removeItem = async (
  page: string,
  title: string,
  userId: number,
): Promise<string[]> => {
  const currentItems = await getItems(page, userId);

  const rom = await prisma.rOM.findFirst({
    where: { title },
    select: { id: true },
  });

  if (!rom) {
    return currentItems;
  }

  await prisma.itemList.deleteMany({
    where: { page, romId: rom.id, userId },
  });

  return getItems(page, userId);
};

const clearItems = async (page: string, userId: number): Promise<string[]> => {
  await prisma.itemList.deleteMany({
    where: { page, userId },
  });

  return [];
};

export { getItems, addItem, removeItem, clearItems };
