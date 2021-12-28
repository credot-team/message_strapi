const crypto = require('crypto');
const dayjs = require('dayjs');

module.exports = async (policyContext, config, { strapi }) => {
  const req = policyContext.request;

  const { phone, content, service, checksum, timestamp } = req.body.data;

  if (!phone || !content || !service || !checksum || !timestamp) {
    return false;
  }

  if (dayjs().isAfter(dayjs.unix(timestamp).add(5, 'm'))) {
    return false;
  }

  const temp = await strapi.db.query('api::service.service').findOne({ where: { name: service } });

  const hash = crypto
    .createHash('sha256')
    .update(`${service}${phone}${content}${timestamp}${temp.secret}`)
    .digest('hex');

  if (hash === checksum) {
    req.body.data.service = temp.id;
    return true;
  }

  return false;
};
