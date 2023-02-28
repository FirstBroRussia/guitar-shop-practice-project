import { GuitarStringsEnum } from "@guitar-shop/shared-types";

export type GuitarStringsType = typeof GuitarStringsEnum[keyof typeof GuitarStringsEnum];
