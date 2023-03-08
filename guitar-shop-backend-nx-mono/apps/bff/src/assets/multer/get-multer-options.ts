import { diskStorage } from 'multer';
import nanoid from 'nanoid-esm';
import mime from 'mime-types';

import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";

import { BadRequestException } from '@nestjs/common';


const REGEX_FORMAT_AVATAR_FILE = /^.*\.(jpg|png)$/;


export const getMulterOptions = (uploadDir: string, ): MulterOptions => ({
  storage: diskStorage({
    destination: uploadDir,
    filename(req, file, callback) {
      if (!REGEX_FORMAT_AVATAR_FILE.test(file.originalname)) {
        throw new BadRequestException('Формат изображения не валиден. Только .jpg и .png');
      }

      const extension = mime.extension(file.mimetype);
      const filename = nanoid();
      callback(null, `${filename}.${extension}`);
    },
  }),
});
