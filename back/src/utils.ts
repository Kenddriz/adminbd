import { Upload } from './shared/shared.input';
import {
  access,
  constants,
  createWriteStream,
  existsSync,
  mkdirSync,
  unlinkSync,
} from 'fs';
import { UnauthorizedException } from '@nestjs/common';
import { join } from 'path';

type FileParams = {
  filename: string;
  mimetype: string;
};
export const publicDir = () =>
  process.env.NODE_ENV === 'development'
    ? join(__dirname, '..', 'public/')
    : 'public/';

export const upload = async (
  file: Upload,
  dossier: string,
): Promise<FileParams> => {
  const { createReadStream, filename, mimetype } = await file;

  const m_filename = filename.substring(-20);

  const path = `${publicDir()}${dossier}/`;
  if (!existsSync(path)) mkdirSync(path, { recursive: true });

  const uploaded = await new Promise((resolve, reject) =>
    createReadStream()
      .pipe(createWriteStream(`${path}${m_filename}`))
      .on('finish', () => resolve(true))
      .on('error', () => reject(false)),
  );
  if (!uploaded) throw new UnauthorizedException(`failed`);

  return { filename: m_filename, mimetype };
};
export const removeFile = (filename: string): boolean => {
  const path = publicDir() + filename;
  let removed = false;
  access(path, constants.F_OK, (err) => {
    if (!err) {
      try {
        unlinkSync(path);
        removed = true;
      } catch {}
    }
  });
  return removed;
};
