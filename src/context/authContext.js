import { useState, createContext } from 'react';
import { LocalStorage } from '../utils/LocalStorage';
//context
export const AuthContext = createContext({})


export const AuthProvider = ({ children }) => {
  const [isAuthenticate, setIsAuthenticate] = useState(false)
  // console.log('to', userToken)
  return (
    <AuthContext.Provider value={{ isAuthenticate, setIsAuthenticate }}>
      {children}
    </AuthContext.Provider>
  )
}
