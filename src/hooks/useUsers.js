import { getUserByIdNumber } from '../services/user.service'
import { useEffect, useState } from 'react'

export const useUser = id => {
 const [user, setUser] = useState({})

 useEffect(() => {
  setUser(getUserByIdNumber)
 }, [id])

 return user
}
