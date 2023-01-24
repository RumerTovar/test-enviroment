import jwt from 'jsonwebtoken';
import { DgraphCompareTokens } from '../../utils/DgraphCompareTokens';

const jwtSecret = process.env.NEXT_PUBLIC_JWT_SECRET;

export default async function verify(req, res) {
 const token = req.body.token;

 if (!token) {
  return res.status(400).json({ error: 'No token provided' });
 }

 try {
  const verify = jwt.verify(token, jwtSecret);
  const email = verify.email;
  const compareTokens = await DgraphCompareTokens(email, token);

  if (compareTokens) {
   res.status(200).json({
    res: 'ok',
    email: email,
   });
  } else {
   res.status(200).json({
    res: 'invalid token',
    email: email,
   });
  }
 } catch (err) {
  res.status(200).json({ error: 'Invalid token' });
 }
}
