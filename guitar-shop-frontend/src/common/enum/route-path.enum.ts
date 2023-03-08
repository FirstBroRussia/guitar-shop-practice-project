export const RoutePathEnum = {
  Main: '/',
  SignIn: '/login',
  Register: '/register',
  Catalog: '/catalog',
  Cart: '/cart',
  ProductCard: '/catalog/:productId',
  Orders: '/orders',
  ProductCardList: '/product-list',
  AddProductCard: '/add-product',
  EditProductCard: '/edit-product',

  NotFound: '*',
} as const;
