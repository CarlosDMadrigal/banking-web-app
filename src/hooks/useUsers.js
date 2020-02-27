import { getUserByIdNumber } from '../services/user.service'
import { useEffect, useState } from 'react'

export const useUser = id => {
 const [user, setUser] = useState({})

 useEffect(() => {
  getUserByIdNumber(id).then(res => {
   setUser(res.data)
  })
 }, [])

 return { user }
}
