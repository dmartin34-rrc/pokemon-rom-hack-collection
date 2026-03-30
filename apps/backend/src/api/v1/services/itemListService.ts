import prisma from '../../../../prisma/client';

const getValidTitles = async (): Promise<string[]> => {
  const roms = await prisma.rOM.findMany({
    select: { title: true },
  });

  return roms.map((rom) => rom.title).filter(Boolean);
};

const getItems = async (page: string): Promise<string[]> => {
  const roms = await prisma.itemList.findMany({
    where: { page },
    include: {
      rom: {
        select: { title: true },
      },
    },
  });

  return roms.map((r) => r.rom.title).filter(Boolean);
};

const addItem = async (page: string, title: string): Promise<string[]> => {
  const currentItems = await getItems(page);
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
    data: [{ page, romId: rom.id }],
  });

  return getItems(page);
};

const removeItem = async (page: string, title: string): Promise<string[]> => {
  const currentItems = await getItems(page);

  const rom = await prisma.rOM.findFirst({
    where: { title },
    select: { id: true },
  });

  if (!rom) {
    return currentItems;
  }

  await prisma.itemList.deleteMany({
    where: { page, romId: rom.id },
  });

  return getItems(page);
};

const clearItems = async (page: string): Promise<string[]> => {
  await prisma.itemList.deleteMany({
    where: { page },
  });

  return [];
};

export { getItems, addItem, removeItem, clearItems };
