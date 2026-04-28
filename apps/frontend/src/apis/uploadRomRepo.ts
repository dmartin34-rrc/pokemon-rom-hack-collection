const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;
const UPLOAD_ROM_ENDPOINT = '/upload-roms';

type RomPayload = {
  title: string;
  description: string;
  tags: string[];
  year: number;
  completed: boolean;
  multiplayer: boolean;
  images: File[];
};

type RomResponse = {
  status: string;
  message?: string;
  data?: {
    id: number;
  };
};

const uploadRom = async (input: RomPayload): Promise<RomResponse> => {
  const formData = new FormData();

  formData.append('title', input.title);
  formData.append('description', input.description);
  formData.append('tags', input.tags.join(','));
  formData.append('year', String(input.year));
  formData.append('completed', String(input.completed));
  formData.append('multiplayer', String(input.multiplayer));

  input.images.forEach((image) => {
    formData.append('images', image);
  });

  const response = await fetch(`${BASE_URL}${UPLOAD_ROM_ENDPOINT}`, {
    method: 'POST',
    body: formData,
  });

  const json: RomResponse = await response.json();
  if (!response.ok) {
    throw new Error(json.message ?? 'Failed to upload ROM');
  }

  return json;
};

export { uploadRom };
export type { RomResponse };
