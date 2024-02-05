import axios from 'axios';
export async function parsePostalCode(code) {
  const res = await axios.get(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${code}`);
  return {
    prefecture_kanji: res.data.results[0].address1,
    city_kanji: res.data.results[0].address2,
    district_kanji: res.data.results[0].address3,
  };
}
