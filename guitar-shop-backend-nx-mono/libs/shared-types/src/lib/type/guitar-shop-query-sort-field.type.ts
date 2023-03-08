type anyTypeORMSortFieldType = "ASC" | "DESC" | "asc" | "desc";
type anyMongoDBSortFieldType = 1 | -1;

export type GuitarShopQueryProductSortFieldType = {
  dateSort: anyTypeORMSortFieldType | null,
  priceSort: anyTypeORMSortFieldType | null,
  ratingSort: anyTypeORMSortFieldType | null,
};

export type GuitarShopQueryOrderSortFieldType = {
  dateSort: anyMongoDBSortFieldType | null,
  priceSort: anyMongoDBSortFieldType | null,
};
