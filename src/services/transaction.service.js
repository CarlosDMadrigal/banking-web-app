import { request } from './api.service'
export function postTransaction(transaction) {
 return request('post', `transaction/`, transaction)
}

export function getTransactionsByUserId(id) {
 return request('get', `transaction/?userId=${id}`)
}
