import { request } from './api.service'
export function postAccount(account, ownerId) {
 return request('post', `account/?ownerId=${ownerId}`, account)
}
