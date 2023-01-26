import axios from 'axios';
import { DgraphUpdateToken } from './DgraphUpdateToken';

const tokenUrl = `${process.env.NEXT_PUBLIC_LOCAL_HOMEPAGE}/api/activationToken`;
const emailUrl = `${process.env.NEXT_PUBLIC_LOCAL_HOMEPAGE}/api/activationEmail`;

export const rensendCode = async (email) => {
 console.log('emnail =>', email);
 try {
  const {
   data: { activationToken },
  } = await axios(tokenUrl);

  const res = await axios.post(emailUrl, {
   email,
   activationToken,
  });

  DgraphUpdateToken(email, activationToken);

  console.log(res);
 } catch (error) {
  console.log(error);
 }
};
