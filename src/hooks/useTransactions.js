import { getTransactionsByUserId } from '../services/transaction.service'
import { useEffect, useState } from 'react'

export const useTransactions = id => {
 const [transactions, setTransactions] = useState([])

 useEffect(() => {
  getTransactionsByUserId(id).then(res => {
   setTransactions(res.data)
  })
  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [])

 return { transactions }
}
