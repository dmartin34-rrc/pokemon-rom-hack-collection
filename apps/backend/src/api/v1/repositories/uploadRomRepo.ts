import prisma from '../../../../prisma/client';
import cardData from '../../../../../../shared/data/cardData.json';
import type Rom from '../../../../../../shared/types/Rom';

type CreateRom = {
  title: string;
  description: string;
  tags: string[];
  year: number;
  completed: boolean;
  multiplayer: boolean;
  imagePaths: string[];
};

const createUploadedRom = async (input: CreateRom) => {
  return prisma.rOM.create({
    data: {
      title: input.title,
      description: input.description,
      tags: input.tags,
      year: input.year,
      completed: input.completed,
      multiplayer: input.multiplayer,
      img: input.imagePaths[0] ?? '',
    },
  });
};

const getSeedRoms = async (): Promise<Rom[]> => {
  const uploadedRoms = await prisma.rOM.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const seedRom = cardData as Rom[];
  const romIndex = new Map<string, Rom>();

  seedRom.forEach((rom) => {
    if (!rom.title) return;
    romIndex.set(rom.title.toLowerCase(), rom);
  });

  uploadedRoms.forEach((rom) => {
    romIndex.set(rom.title.toLowerCase(), {
      id: rom.id,
      title: rom.title,
      description: rom.description,
      tags: rom.tags,
      img: rom.img,
      year: rom.year,
      completed: rom.completed,
      multiplayer: rom.multiplayer,
    });
  });

  return Array.from(romIndex.values());
};

export { createUploadedRom, getSeedRoms };
