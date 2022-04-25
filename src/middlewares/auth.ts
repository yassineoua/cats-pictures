const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;

export async function verifyToken(req, res, next) {
  const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['authorization'];
  if (!token) {
    return res.status(403).send('A token is required for authentication');
  }
  try {
    const access_token = token.split('Bearer ')[1];
    const decoded = jwt.verify(access_token, SECRET_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send('Invalid Token');
  }

  return next();
}
