import { GuitarEnum } from '../enum/guitar.enum';

export type GuitarType = typeof GuitarEnum[keyof typeof GuitarEnum];
