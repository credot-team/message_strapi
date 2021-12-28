module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '3fae3c0f5d790911afe5ec5e51378180'),
  },
});
