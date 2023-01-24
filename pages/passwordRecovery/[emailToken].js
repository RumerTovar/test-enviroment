import axios from 'axios';
import NewPasswordModal from '../../components/newPasswordModal/NewPasswordModal';

const url = process.env.NEXT_PUBLIC_LOCAL_HOMEPAGE;

export default function ChangePassword({ userEmail, isValidToken }) {
 return (
  <>
   {isValidToken ? (
    <NewPasswordModal userEmail={userEmail} error='' />
   ) : (
    <NewPasswordModal
     userEmail={userEmail}
     error="We're sorry, but the password recovery link you have provided is no longer valid. Please request a new password recovery link and try again."
    />
   )}
  </>
 );
}

ChangePassword.getInitialProps = async ({ query }) => {
 try {
  /* aqui vamos a recibir la url corta
la vamos a enviar a la base de datos 
para que nos devuelva la url real
y seguir con este flujo que ya esta establecido 
-si es falso que devuelva 404
- si es true que siga este flujo
*/
  const sendShortURL = await axios.post(`${url}/api/shortURL`, {
   token: query.emailToken,
  });
  const { fullURL } = sendShortURL.data;

  if (!fullURL) {
   return {
    isValidToken: false,
    userEmail: null,
   };
  } else {
   const req = await axios.post(`${url}/api/verifyToken`, {
    token: fullURL,
   });
   const { res, email } = req.data;
   if (res === 'ok') {
    return {
     isValidToken: true,
     userEmail: email,
    };
   } else {
    return {
     isValidToken: false,
     userEmail: email,
    };
   }
  }
 } catch (error) {
  return console.error(error);
 }
};
