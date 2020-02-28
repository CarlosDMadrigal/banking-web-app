import { request } from './api.service'
export function postUser(user) {
 let header = { Authentication: sessionStorage.getItem('jwt') }
 return request('post', `register`, user, header)
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
 console.log(jwt)
 let header = { Authentication: jwt }
 console.log(header)
 return request('get', `user/?id=${id}`, null, header)
}
