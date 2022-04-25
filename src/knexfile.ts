module.exports = {
  development: {
    client: process.env.DB_CONNECTION || 'mysql',
    connection: process.env.DATABASE_URL || 'mysql://root:admin@localhost:3306/cats-app?charset=utf8mb4',
    migrations: {
      tableName: 'migrations',
    },
  },

  production: {
    client: process.env.DB_CONNECTION,
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_DATABASE,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'migrations',
    },
  },
};
