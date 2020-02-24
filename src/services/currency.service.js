import axios from 'axios'

export function requestCurrency(from, to, amount) {
 return axios({
  method: 'get',
  url: `http://www.api.currencylayer.com/convert?access_key=36896d0b63301dbd8a2278169c83120e
    & from = ${from}
    & to = ${to}
    & amount = ${amount}
    & format = 1`,
  data: {},
  headers: {},
 })
}
