import { GuitarStringsEnum } from '../enum/guitar-strings.enum';

export type GuitarStringsType = typeof GuitarStringsEnum[keyof typeof GuitarStringsEnum];
