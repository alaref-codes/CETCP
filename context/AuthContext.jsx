import { createContext, useState,useEffect } from "react";
import * as URL from '@/constants'
const AuthContext = createContext();


async function getUserData(token) {
  return await fetch(`${URL.API_URL}/user-show`, {
    headers: {'Authorization': `Bearer ${token}`} })
  .then(res => res.json())
}

function AuthProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(undefined);

  const login = (jwtToken) => {
    setIsLoggedIn(true);  
    setToken(jwtToken);
    getUserData(jwtToken).then(data => {
      setUser(data.data)
    })
  };

  // useEffect(() => {
  //   if (localStorage.getItem("token") && localStorage.getItem("token") != "null"){
  //     getUserData(localStorage.getItem("token")).then((data) => {
  //       console.log(data.data);
  //       setUser(data);
  //     });
  //   }
  // }, [])

  const logout = () => {
    setIsLoggedIn(false);
    setToken(null);
  };

  const value = {
    isLoggedIn,
    token,
    login,
    logout,
    setUser,
    user
  };

  return <AuthContext.Provider value={value} {...props} />;
}

export { AuthContext, AuthProvider };
