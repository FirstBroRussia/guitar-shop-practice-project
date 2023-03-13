export const RoutePathEnum = {
  Main: '/',
  Login: '/login',
  Register: '/register',
  Catalog: '/catalog',
  Cart: '/cart',
  ProductCard: '/catalog/:productId',
  OrderList: '/order-list',
  Order: '/order/:orderId',
  ProductList: '/product-list',
  AddProductCard: '/add-product',
  EditProductCard: '/edit-product/:productId',

  ProductCardCharacteristics: '#characteristics',
  ProductCardDescription: '#description',

  NotFound: '*',
} as const;
