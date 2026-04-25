import fs from 'fs';
import path from 'path';
import multer from 'multer';

const uploadDir = path.resolve(process.cwd(), 'uploads');

fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    const fileExtension = path.extname(file.originalname);

    const defaultName = path
      .basename(file.originalname, fileExtension)
      .replace(/[^a-zA-Z0-9_-]/g, '-');
    cb(null, `${Date.now()}-${defaultName}${fileExtension}`);
  },
});

const upload = multer({ storage });

export default upload;
