import { request } from './api.service'
export function postTransaction(transaction) {
 return request('post', `transaction/`, transaction)
}
