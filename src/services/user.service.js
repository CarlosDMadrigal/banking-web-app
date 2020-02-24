import { request } from './api.service'
export function postUser(user) {
 return request('post', `register`, user)
}

export function logIn(email, password) {
 return request('get', `login/?email=${email}&password=${password}`)
}

export function getUserByIdNumber(id) {
 return request('get', `user/?id=${id}`)
}
