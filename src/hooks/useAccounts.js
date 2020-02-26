import {
 getAccountsByOwnerId,
 getAccountByKey,
} from '../services/account.service'
import { useEffect, useState } from 'react'

export const useAccounts = id => {
 const [accounts, setAccounts] = useState([])

 useEffect(() => {
  getAccountsByOwnerId(id).then(res => setAccounts(res.data))
  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [])

 return { accounts }
}

export const useAccountByKey = key => {
 const [account, setAccount] = useState({})

 useEffect(() => {
  getAccountByKey(key).then(res => setAccount(res.data))
  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [])

 return { account }
}
