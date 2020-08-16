module.exports = {
    dev: {
      dbUserName: process.env.DB_USER_NAME,
      dbPassword: process.env.DB_PASSWORD,
      hostName: process.env.DB_HOST_NAME,
      dbName: process.env.DB_NAME,
      queryParams: 'retryWrites=true&w=majority',
    },
    prod: {
      dbUserName: process.env.DB_USER_NAME,
      dbPassword: process.env.DB_PASSWORD,
      hostName: process.env.DB_HOST_NAME,
      dbName: process.env.DB_NAME,
      queryParams: 'retryWrites=true&w=majority',
    },
  };