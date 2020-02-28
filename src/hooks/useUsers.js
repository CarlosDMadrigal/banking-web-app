import { getUserByIdNumber } from '../services/user.service'
import { useEffect, useState } from 'react'

export const useUser = (id, jwt) => {
 const [user, setUser] = useState({})

 useEffect(() => {
  getUserByIdNumber(id, jwt).then(res => {
   setUser(res.data)
  })
  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [])

 return { user, setUser }
}
