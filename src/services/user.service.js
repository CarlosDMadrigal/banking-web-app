import { request } from './api.service'
export function postUser(user) {
 return request('post', `register`, user)
}
