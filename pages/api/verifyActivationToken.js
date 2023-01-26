import { DgraphCompareCodes } from '../../utils/DgraphCompareCodes';

export default async function verify(req, res) {
 const { email, code } = req.body;

 try {
  const compareTokens = await DgraphCompareCodes(email, code);

  if (compareTokens === true) {
   res.status(200).json({
    res: 'ok',
   });
  } else if (compareTokens === 'invalid') {
   res.status(200).json({ res: 'Invalid token' });
  } else {
   res.status(200).json({
    res: 'invalid code',
   });
  }
 } catch (err) {
  console.log(err);
  res.status(200).json({
   res: 'invalid code',
  });
 }
}
