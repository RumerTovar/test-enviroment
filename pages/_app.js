import { GoogleOAuthProvider } from '@react-oauth/google';
import { UserProvider } from '../context/UserContext';
import '../styles/globals.css';
const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

export default function App({ Component, pageProps }) {
 return (
  <GoogleOAuthProvider clientId={clientId}>
   <UserProvider UserProvider>
    <Component {...pageProps} />
   </UserProvider>
  </GoogleOAuthProvider>
 );
}
