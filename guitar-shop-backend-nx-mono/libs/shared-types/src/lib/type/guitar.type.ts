import { GuitarEnum } from "@guitar-shop/shared-types";

export type GuitarType = typeof GuitarEnum[keyof typeof GuitarEnum];
