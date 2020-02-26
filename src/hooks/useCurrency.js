import { requestCurrency } from '../services/currency.service'
import { useEffect, useState } from 'react'

export const useCurrency = () => {
 const [currency, setCurrency] = useState(0)

 useEffect(() => {
  requestCurrency().then(res => {
   console.log(res)
   console.log(res.data['quotes']['USDCRC'])
   setCurrency(res.data['quotes']['USDCRC'])
  })
  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [])

 return { currency }
}
