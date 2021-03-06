const crypto = require('crypto');
const dayjs = require('dayjs');
const qs = require('qs');

module.exports = async (policyContext, config, { strapi }) => {
  const url = policyContext.request.originalUrl;
  const params = qs.parse(url.split('?')[1]);

  const service = params.filters.service['$eq'];
  const { checksum, timestamp } = params;

  if (!service || !checksum || !timestamp) {
    return false;
  }

  if (dayjs().isAfter(dayjs.unix(timestamp).add(+process.env.EXPIRED_TIME, 'm'))) {
    return false;
  }

  const temp = await strapi.db
    .query('api::service.service')
    .findOne({ where: { name: service, enabled: true } });

  const hash = crypto
    .createHash('sha256')
    .update(`${service}${timestamp}${temp.secret}`)
    .digest('hex');

  if (hash !== checksum) {
    return false;
  }
};
