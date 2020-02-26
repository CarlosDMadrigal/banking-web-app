import axios from 'axios'

export function requestCurrency() {
 return axios({
  method: 'get',
  url: `http://apilayer.net/api/live?access_key=36896d0b63301dbd8a2278169c83120e&currencies=CRC&source=USD&format=1`,
 })
}
