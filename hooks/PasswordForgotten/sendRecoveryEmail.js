import axios from 'axios';

const url = `${process.env.NEXT_PUBLIC_LOCAL_HOMEPAGE}/api/sendEmail`;

export const sendRecoveryEmail = async (email) => {
 const req = await axios.post(url, { email });
 const res = req.data;

 console.log(res);
};
