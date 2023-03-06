module.exports = {
  apps : [
    {
      name: 'users',
      script: 'start-users.js',
      watch: './apps/users/',
    },
    {
      name: 'products',
      script: 'start-products.js',
      watch: './apps/products/',
    },
    {
      name: 'comments',
      script: 'start-comments.js',
      watch: './apps/comments/',
    },
    {
      name: 'orders',
      script: 'start-orders.js',
      watch: './apps/orders/',
    },
    {
      name: 'notify',
      script: 'start-notify.js',
      watch: './apps/notify/',
    },
    {
      name: 'bff',
      script: 'start-bff.js',
      watch: './apps/bff/',
    },
  ],
};
