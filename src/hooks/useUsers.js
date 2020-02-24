import { getUserByIdNumber } from '../services/user.service'
import { useEffect, useState, React } from 'react'

export const useUser = id => {
 const [user, setUser] = useState({})

 useEffect(() => {
  setUser(getUserByIdNumber)
 }, [id])
}
