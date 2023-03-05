export interface ProductCardMockDataInterface  {
  title?: string[];
  description?: string[];
  createdAt?: Date[];
  imageLink?: string[];
  guitarType: ("Electro" | "Acoustic" | "Ukulele")[];
  article?: string[];
  guitarStringsCount?: (4 | 6 | 7 | 12)[];
  price?: number[];
}
