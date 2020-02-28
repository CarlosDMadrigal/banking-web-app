import { request } from './api.service'
export function postUser(user) {
 return request('post', `register/`, user)
}

export function putUser(user, jwt) {
 let header = { Authentication: jwt }
 return request('put', `user/`, user, header)
}

export function logIn(email, password) {
 return request('get', `login/?email=${email}&password=${password}`)
}

export function getUserByEmailAndPassword(email, password, jwt) {
 let header = { Authentication: jwt }
 return request(
  'get',
  `user/?email=${email}&password=${password}`,
  null,
  header
 )
}
export function getUserByIdNumber(id, jwt) {
 let header = { Authentication: jwt }
 return request('get', `user/?id=${id}`, null, header)
}
