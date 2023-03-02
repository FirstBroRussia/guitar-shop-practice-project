import * as crypto from 'crypto';
import { ClassConstructor, plainToInstance } from "class-transformer";

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
}
