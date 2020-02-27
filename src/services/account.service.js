import { request } from './api.service'
export function postAccount(account, ownerId) {
 let header = { jwt: sessionStorage.getItem('jwt') }
 return request('post', `account/?ownerId=${ownerId}`, account, header)
}
export function getAccountByKey(accountKey) {
 let header = { jwt: sessionStorage.getItem('jwt') }
 return request('get', `account/?accountKey=${accountKey}`, null, header)
}
export function getAccountsByOwnerId(ownerId) {
 let header = { jwt: sessionStorage.getItem('jwt') }
 return request('get', `account/?ownerId=${ownerId}`, null, header)
}
