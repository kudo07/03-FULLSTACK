const jwt = require('jsonwebtoken');
const JWT_SECRET = 'WFEFEW';

function auth(req, res, next) {
  const token = req.headers.authorisation;
  const response = jwt.verify(token, JWT_SECRET);
  if (response) {
    req.userId = response.id;
    next();
  } else {
    res.status(403).json({
      message: 'INcorrect creds',
    });
  }
}

module.exports = {
  auth,
  JWT_SECRET,
};
