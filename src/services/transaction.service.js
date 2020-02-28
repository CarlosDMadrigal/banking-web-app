import { request } from './api.service'
export function postTransaction(transaction, jwt) {
 let header = { Authentication: jwt }
 return request('post', `transaction/`, transaction, header)
}

export function getTransactionsByUserId(id, jwt) {
 let header = { Authentication: jwt }
 return request('get', `transaction/?userId=${id}`, null, header)
}

export function getTransactionsByAccountKey(id, jwt) {
 let header = { Authentication: jwt }
 return request('get', `transaction/?accountKey=${id}`, null, header)
}
