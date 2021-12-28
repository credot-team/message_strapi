const path = require('path');

module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: 'containers-us-west-19.railway.app',
      port: 7153,
      database: 'railway',
      user: 'postgres',
      password: 'rrnNNKFygvD3Zs5YGYfL',
      schema: env('DATABASE_SCHEMA', 'public'), // Not required
      ssl: {
        rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false), // For self-signed certificates
      },
    },
    debug: false,
  },
});
