module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  // host: 'msg.credot-web.com',
  // port: 1337,
  url: env('URL', ''),
  // proxy: env.bool('IS_PROXIED', true),
});
