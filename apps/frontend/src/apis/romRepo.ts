import type Rom from '../../../../shared/types/Rom';

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;
const ROM_CATALOG_ENDPOINT = '/upload-roms';

type RomRepoResponseJSON = {
  status: string;
  message?: string;
  data?: Rom[];
};

const getImgUrl = (img?: string): string | undefined => {
  if (!img) return img;

  if (img.startsWith('/uploads/')) {
    return `${import.meta.env.VITE_API_BASE_URL}${img}`;
  }

  return img;
};

const getSeedRoms = async (): Promise<Rom[]> => {
  const response = await fetch(`${BASE_URL}${ROM_CATALOG_ENDPOINT}`);

  if (!response.ok) {
    throw new Error('Failed to fetch ROM catalog');
  }

  const json: RomRepoResponseJSON = await response.json();
  return (json.data ?? []).map((rom) => ({
    ...rom,
    img: getImgUrl(rom.img),
  }));
};

export { getSeedRoms };
