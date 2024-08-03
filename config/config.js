module.exports = {
    db: {
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'bookstore',
      dialect: 'mysql'
    },
    jwtSecret: process.env.JWT_SECRET || "secret",
    version: `v1.0.1`
};