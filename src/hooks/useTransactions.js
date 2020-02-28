import {
 getTransactionsByUserId,
 getTransactionsByAccountKey,
} from '../services/transaction.service'
import { useEffect, useState } from 'react'

export const useTransactions = (id, jwt) => {
 const [transactions, setTransactions] = useState([])
 const [reloadTransaction, setReloadTransaction] = useState(false)

 useEffect(() => {
  getTransactionsByUserId(id, jwt).then(res => {
   setTransactions(res.data)
  })
  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [])

 useEffect(() => {
  if (reloadTransaction) {
   getTransactionsByUserId(id, jwt).then(res => setTransactions(res.data))
   setReloadTransaction(false)
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [reloadTransaction])

 return {
  transactions,
  reloadTransaction: () => {
   setReloadTransaction(true)
  },
 }
}
export const useTransactionsByAccount = (id, jwt) => {
 const [transactions, setTransactions] = useState([])

 useEffect(() => {
  getTransactionsByAccountKey(id, jwt).then(res => {
   setTransactions(res.data)
  })
  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [])

 return { transactions }
}
