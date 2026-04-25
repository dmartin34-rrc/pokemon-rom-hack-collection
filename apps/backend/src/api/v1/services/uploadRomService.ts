import type Rom from '../../../../../../shared/types/Rom';
import { createUploadedRom, getSeedRoms } from '../repositories/uploadRomRepo';

type RomPayload = {
  title: string;
  description: string;
  tags: string[];
  year: number;
  completed: boolean;
  multiplayer: boolean;
  imagePaths: string[];
};

type UploadResult =
  | {
      isValid: true;
      data: Awaited<ReturnType<typeof createUploadedRom>>;
    }
  | {
      isValid: false;
    };

const tagValues = (tags: string[]): string[] =>
  tags.map((tag) => tag).filter(Boolean);

const createRom = async (payload: RomPayload): Promise<UploadResult> => {
  const createdRom = await createUploadedRom({
    ...payload,
    title: payload.title,
    description: payload.description,
    tags: tagValues(payload.tags),
  });

  return { isValid: true, data: createdRom };
};

const listSeededRoms = async (): Promise<Rom[]> => {
  return getSeedRoms();
};

export { createRom, listSeededRoms };
