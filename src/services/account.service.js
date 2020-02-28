import { request } from './api.service'
export function postAccount(account, ownerId, jwt) {
 let header = { Authentication: jwt }
 return request('post', `account/?ownerId=${ownerId}`, account, header)
}
export function getAccountByKey(accountKey, jwt) {
 let header = { Authentication: jwt }
 return request('get', `account/?accountKey=${accountKey}`, null, header)
}
export function getAccountsByOwnerId(ownerId, jwt) {
 let header = { Authentication: jwt }
 return request('get', `account/?ownerId=${ownerId}`, null, header)
}
