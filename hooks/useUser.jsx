// import React, { useState, useEffect } from 'react';


// async function getUserData(token) {
//     return await fetch(`${URL.API_URL}/user-show`, {
//       headers: {'Authorization': `Bearer ${token}`} })
//     .then(res => res.json())
//   }
  
// const useUser = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     if (localStorage.getItem("token") && localStorage.getItem("token") != "null") {
//       getUserData(storedToken).then((data) => {
//         setUser(data.data);
//       });
//     }
//   }, []);

  
//   const loading = !user && !error;
//   const isLoggedIn = user ? true : false;

//   return {
//     loading,
//     isLoggedIn,
//     user,
//   };
// };

// export default useUser;