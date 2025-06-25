// Import jwt modules

const jwt = require('jsonwebtoken');
//
const JWT_SECRET = 'hewkjfgbkwj';
function auth(req, res, next) {
  const token = req.headers.authorization;
  //   in postman key value authorization: token
  //   verify the token
  const decodedData = jwt.verify(token, JWT_SECRET);
  if (decodedData) {
    req.userId = decodedData.id;
    next();
  } else {
    res.status(403).json({
      message: 'Incorrect crediantials',
    });
  }
}
module.exports = {
  auth,
  JWT_SECRET,
};
//
