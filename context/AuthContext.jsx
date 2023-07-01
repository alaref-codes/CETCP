import { createContext, useState,useEffect } from "react";
const AuthContext = createContext();


async function getUserData(token) {
  return await fetch(`${URL.API_URL}/user-show`, {
    headers: {'Authorization': `Bearer ${token}`} })
  .then(res => res.json())
}

function AuthProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [myData, setMyData] = useState(undefined);

  const login = (jwtToken) => {
    setIsLoggedIn(true);  
    setToken(jwtToken);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setToken(null);
  };

  const value = {
    isLoggedIn,
    token,
    login,
    logout,
  };
//   useEffect(() => {

//     if (!isLoggedIn) {
//       const storedToken = localStorage.getItem("token");
//       if (storedToken != "null") {
//         getUserData(storedToken).then((data) => {
//           setMyData(data);
//         });
//       }
//     } else {
//       getUserData(token).then((data) => {
//         setMyData(data);
//       });
//     }
// }, []);


  return <AuthContext.Provider value={value} {...props} />;
}

export { AuthContext, AuthProvider };
