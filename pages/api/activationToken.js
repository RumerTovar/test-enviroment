import jwt from 'jsonwebtoken';
const jwtSecret = process.env.NEXT_PUBLIC_JWT_SECRET;

export default async function verify(req, res) {
 const randomNumber = Math.floor(Math.random() * 900000) + 100000;
 const activationToken = jwt.sign(
  {
   code: randomNumber,
  },
  jwtSecret,
  { expiresIn: '300000' }
 );

 res.status(200).json({
  activationToken,
 });
}
