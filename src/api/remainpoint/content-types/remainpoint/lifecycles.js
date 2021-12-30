const axios = require('axios');
const qs = require('qs');

const query = qs.stringify({
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
});

const deresponse = (input) => {
  const arr = input.split('\r\n');
  let resp = {};
  for (const a of arr) {
    const temp = a.split('=');
    if (temp.length === 2) resp[temp[0]] = temp[1];
  }
  return resp;
};

async function getAmount() {
  try {
    const { data } = await axios.get(`${process.env.SMSDOMAIN}/api/mtk/SmQuery?${query}`);

    const { Error: error, AccountPoint } = deresponse(data);

    if (error) {
      throw new Error(error);
    }
    return AccountPoint;
  } catch (error) {
    console.log(error.message);
    return 0;
  }
}

module.exports = {
  async afterFindOne(event) {
    event.result.points = await getAmount();
  },
};
