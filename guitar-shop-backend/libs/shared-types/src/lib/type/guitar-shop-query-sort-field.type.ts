type anySortFieldType = "ASC" | "DESC" | "asc" | "desc";

export type GuitarShopQuerySortFieldType = {
  dateSort: anySortFieldType | null,
  priceSort: anySortFieldType | null,
  ratingSort: anySortFieldType | null,
};
