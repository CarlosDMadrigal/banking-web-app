import { request } from './api.service'
export function postTransaction(transaction) {
 let header = { jwt: sessionStorage.getItem('jwt') }
 return request('post', `transaction/`, transaction, header)
}

export function getTransactionsByUserId(id) {
 let header = { jwt: sessionStorage.getItem('jwt') }
 return request('get', `transaction/?userId=${id}`, null, header)
}

export function getTransactionsByAccountKey(id) {
 let header = { jwt: sessionStorage.getItem('jwt') }
 return request('get', `transaction/?accountKey=${id}`, null, header)
}
