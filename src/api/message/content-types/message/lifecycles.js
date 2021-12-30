const axios = require('axios');
const qs = require('qs');

const deresponse = (input) => {
  const arr = input.split('\r\n');
  let resp = {};
  for (const a of arr) {
    const temp = a.split('=');
    if (temp.length === 2) resp[temp[0]] = temp[1];
  }
  return resp;
};

module.exports = {
  async beforeCreate(event) {
    try {
      const query = qs.stringify({
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        dstaddr: event.params.data.phone,
        smbody: event.params.data.content,
        CharsetURL: 'UTF8',
      });

      const { data } = await axios.post(`${process.env.SMSDOMAIN}/api/mtk/SmSend?${query}`);
      const temp = deresponse(data);

      if (temp.statuscode !== '1') {
        event.params.data.errormessage = JSON.stringify(temp);
      }
    } catch (error) {
      console.log(error.message);
    }
  },
};
