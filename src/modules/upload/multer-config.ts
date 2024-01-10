import * as multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';
import { createCipheriv, randomBytes, scrypt } from 'crypto';
import { Request } from 'express';

const s3Config = new S3Client({
  region: process.env.AWS_REGION || 'sa-east-1', //região selecionada na criação do bucket
  credentials: {
    accessKeyId: process.env.AWS_SECRET_ACCESS_KEY, //chave de acesso
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, //chave de acesso secreta
  },
});

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const MAX_SIZE_TWO_MEGABYTES = 2 * 1024 * 1024;

const multerConfig = {
  local: multer.diskStorage({
    destination: (
      req: Request,
      file: Express.Multer.File,
      cb: DestinationCallback,
    ) => {
      cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'));
    },
    filename: (
      req: Request,
      file: Express.Multer.File & { key: string },
      cb: FileNameCallback,
    ) => {
      randomBytes(16, (err: Error, hash: Buffer) => {
        if (err) cb(err, file.filename);

        file.key = `${hash.toString('hex')}-${file.originalname}`;

        cb(null, file.key);
      });
    },
  }),
  s3storage: multerS3({
    s3: s3Config,
    bucket: process.env.AWS_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req: Request, file: Express.Multer.File, cb: FileNameCallback) => {
      const fileName =
        path.parse(file.originalname).name.replace(/\s/g, '') + '-' + uuidv4();

      const extension = path.parse(file.originalname).ext;
      cb(null, `${fileName}${extension}`);
    },
  }),
};

export default {
  dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
  limits: {
    fileSize: MAX_SIZE_TWO_MEGABYTES,
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'image/jpeg',
      'image/pjpeg',
      'image/png',
      'image/gif',
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type.'));
    }
  },
  muterStorage: multerConfig[process.env.STORAGE_TYPE],
};
