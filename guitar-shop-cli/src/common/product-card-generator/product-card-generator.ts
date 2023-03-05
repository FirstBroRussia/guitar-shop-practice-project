import { getRandomValue } from "../../assets/helper/helpers.js";

import { ProductCardMockDataInterface } from "../../assets/interface/product-card-mock-data.interface.js";

export default class ProductCardDataGenerator {
  constructor (
    private readonly productCardMockData: ProductCardMockDataInterface,
  ) { }

  public generate() {
    const { title, description, guitarType, guitarStringsCount, article, price, imageLink } = this.productCardMockData;

    return {
      title: getRandomValue<string>(title!),
      description: getRandomValue<string>(description!),
      guitarType: getRandomValue<"Electro" | "Acoustic" | "Ukulele">(guitarType!),
      guitarStringsCount: getRandomValue<4 | 6 | 7 | 12>(guitarStringsCount!),
      article: getRandomValue<string>(article!),
      price: getRandomValue<number>(price!),
      imageLink: getRandomValue<string>(imageLink!),
    };
  }

}
