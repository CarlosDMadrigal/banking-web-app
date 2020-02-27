import { request } from './api.service'
export function postUser(user) {
 let header = { jwt: sessionStorage.getItem('jwt') }
 return request('post', `register`, user, header)
}

export function logIn(email, password) {
 return request('get', `login/?email=${email}&password=${password}`)
}

export function getUserByEmailAndPassword(email, password) {
 let header = { jwt: sessionStorage.getItem('jwt') }
 return request(
  'get',
  `user/?email=${email}&password=${password}`,
  null,
  header
 )
}
export function getUserByIdNumber(id) {
 let header = { jwt: sessionStorage.getItem('jwt') }
 return request('get', `user/?id=${id}`, null, header)
}
