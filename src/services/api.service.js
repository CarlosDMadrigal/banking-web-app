import { API_URL as apiUrl } from '../appConstants'
import axios from 'axios'

export function request(method, endpoint, data = null, headers = null) {
 return axios({
  method: method,
  url: `${apiUrl + endpoint}`,
  data: data || {},
  headers: headers || {},
 })
}
