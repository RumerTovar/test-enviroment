import { createContext, useState } from 'react';
const EmailContext = createContext();

export default EmailContext;

export const EmailProvider = ({ children }) => {
 const [email, setEmail] = useState(null);

 const contextData = { email, setEmail };

 return (
  <EmailContext.Provider value={contextData}>{children}</EmailContext.Provider>
 );
};
