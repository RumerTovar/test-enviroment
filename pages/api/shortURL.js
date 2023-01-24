import { DgraphSearchURL } from '../../utils/DgraphSearchURL';

export default async function verify(req, res) {
 const shortURL = req.body.token;

 try {
  const requestURL = await DgraphSearchURL(shortURL);

  res.status(200).json({
   fullURL: requestURL,
  });
 } catch (err) {
  res.status(200).json({ error: 'Page not found' });
 }
}
