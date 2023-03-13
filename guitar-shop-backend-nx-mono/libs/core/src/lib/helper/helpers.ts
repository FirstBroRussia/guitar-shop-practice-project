import * as crypto from 'crypto';
import { ClassConstructor, plainToInstance } from "class-transformer";

import { GuitarEnum } from '@guitar-shop/shared-types';

export function getMongoConnectionString({username, password, host, port, databaseName, authDatabase}): string {
  return `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=${authDatabase}`;
}

export const fillDTO = <T, V>(someDto: ClassConstructor<T>, plainObject: V): T => {
  return plainToInstance(someDto, plainObject, { excludeExtraneousValues: true });
};

export const createSHA256 = (line: string, salt: string): string => {
  const shaHasher = crypto.createHmac('sha256', salt);

  return shaHasher.update(line).digest('hex');
};

export const checkPassword = (password: string, passwordHash: string, salt: string): boolean => {
  const loginPasswordHash = createSHA256(password, salt);

  return loginPasswordHash === passwordHash;
};

export const getNewRatingForProductCard = (currentRating: number, currentCommentsCount: number, newScoreRating: number): number => ((currentRating * currentCommentsCount) + newScoreRating) / (currentCommentsCount + 1);

export const getTransformDateForEJSComponents = (ISOString: string): string => {
  const day = new Date(ISOString).getDate();
  const month = new Date(ISOString).getMonth() + 1;
  const year = new Date(ISOString).getFullYear();

  return `${day < 10 ? `0${day}` : day}.${month < 10 ? `0${month}` : month}.${year}`;
};

export const getGuitarTypeStringForEJSComponents = (guitarType: string): string => {
  switch (guitarType) {
    case GuitarEnum.Acoustic: return 'Акустическая гитара';
    case GuitarEnum.Electro: return 'Электрогитара';
    case GuitarEnum.Ukulele: return 'Укулеле';
    default: return 'Неизвестный вид гитары :-)';
  }
};
