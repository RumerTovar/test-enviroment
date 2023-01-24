import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useContext } from 'react';
import UserContext from '../../context/UserContext';
import { DgraphSignUp } from './DgraphSignUp';

const googleUrl = 'https://www.googleapis.com/oauth2/v3/userinfo';

export const useGooglehook = (setIsOpen, setLoginError) => {
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

    DgraphSignUp(data, setUser, setIsOpen, setLoginError);
   } catch (error) {
    console.error(error);
   }
  },
 });

 return {
  login,
 };
};
