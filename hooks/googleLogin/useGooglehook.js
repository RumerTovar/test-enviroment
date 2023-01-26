import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useContext } from 'react';
import EmailContext from '../../context/EmailContext';
import UserContext from '../../context/UserContext';
import { DgraphSignUp } from './DgraphSignUp';

const googleUrl = 'https://www.googleapis.com/oauth2/v3/userinfo';

export const useGooglehook = (
 setIsOpen,
 setLoginError,
 setVerificationModal
) => {
 const { setEmail } = useContext(EmailContext);

 const { setUser } = useContext(UserContext);

 const login = useGoogleLogin({
  onSuccess: async (response) => {
   try {
    const res = await axios(googleUrl, {
     headers: {
      Authorization: `Bearer ${response.access_token}`,
     },
    });

    const { data } = res;

    setEmail(data.email);

    DgraphSignUp(data, setUser, setIsOpen, setLoginError, setVerificationModal);
   } catch (error) {
    console.error(error);
   }
  },
 });

 return {
  login,
 };
};
