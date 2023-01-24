import { createContext, useEffect, useState } from 'react';
const UserContext = createContext();

export default UserContext;

export const UserProvider = ({ children }) => {
 const [path, setPath] = useState(null);
 const [user, setUser] = useState(null);
 useEffect(() => {
  const mylocal = window.localStorage.getItem('loggedAppUser');
  if (mylocal) {
   const loggedUser = JSON.parse(mylocal);
   setUser(loggedUser);
  } else {
   setUser({});
  }
 }, []);

 const contextData = { setUser, user, setPath, path };

 return (
  <UserContext.Provider value={contextData}>{children}</UserContext.Provider>
 );
};
