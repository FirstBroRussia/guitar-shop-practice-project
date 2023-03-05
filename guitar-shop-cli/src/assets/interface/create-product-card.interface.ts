export class GuitarShopCreateProductCardDto {
  creatorUserId?: string;

  title?: string;

  description?: string;

  imageLink?: string;

  guitarType?: "Electro" | "Acoustic" | "Ukulele";

  guitarStringsCount?: 4 | 6 | 7 | 12;

  article?: string;

  price?: number;

}

