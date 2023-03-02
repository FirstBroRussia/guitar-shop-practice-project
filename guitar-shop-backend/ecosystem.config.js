module.exports = {
  apps : [
    {
      script: 'nx run users:serve',
      name: 'users-microservice',
      watch: './apps/users',
    }
  ],
};
