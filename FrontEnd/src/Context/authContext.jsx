import React, { useContext, useEffect, useState } from 'react'


const AuthContext = React.createContext();

export const AuthProvider = (props) => {

  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("Medi_vaultUser")) || ""
  );


  const [isLogin, setIsLogin] = useState(false)
  const [isPatient, setIsPatient] = useState(false)
  const [isDoctor, setIsDoctor] = useState(false)

  useEffect(() => {
    setIsLogin(!!user)
  }, [user])

  const value = { user, setUser, isLogin, setIsLogin, isPatient , setIsPatient , isDoctor , setIsDoctor }

  return (
    <AuthContext.Provider value={value}> {props.children}</AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext);
}

