import { request } from './api.service'
export function postAccount(account, ownerId) {
 return request('post', `account/?ownerId=${ownerId}`, account)
}
export function getAccountByKey(accountKey) {
 return request('get', `account/?accountKey=${accountKey}`)
}
export function getAccountsByOwnerId(ownerId) {
 return request('get', `account/?ownerId=${ownerId}`)
}
