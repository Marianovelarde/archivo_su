import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  restoreSession,
  expireSession,
} from './store/api/authSlice'



const AppWrapper = ({ children }) => {
  const dispatch = useDispatch()

useEffect(() => {
  const stored = localStorage.getItem('auth')

  if (!stored) return

  dispatch(restoreSession(JSON.parse(stored)))
}, [dispatch])


  return children
}

export default AppWrapper

