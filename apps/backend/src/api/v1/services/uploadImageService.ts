import path from 'path';
import { put } from '@vercel/blob';

const defaultName = (fileName: string): string => {
  const fileExtension = path.extname(fileName);
  const baseName = path.basename(fileName, fileExtension);

  return baseName.replace(/[^a-zA-Z0-9_-]/g, '-');
};

const createFileName = (file: Express.Multer.File): string => {
  const extension = path.extname(file.originalname) || '.bin';
  const fileName = defaultName(file.originalname);
  const suffix = Math.random().toString(36).slice(2, 10);

  return `roms/${Date.now()}-${suffix}-${fileName}${extension}`;
};

const uploadImage = async (files: Express.Multer.File[]): Promise<string[]> => {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error('Missing token for image uploads.');
  }

  const uploads = files.map(async (file) => {
    const blob = await put(createFileName(file), file.buffer, {
      access: 'public',
      contentType: file.mimetype,
      addRandomSuffix: false,
    });

    return blob.url;
  });

  return Promise.all(uploads);
};

export { uploadImage };
