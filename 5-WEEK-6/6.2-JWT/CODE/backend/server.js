const jwt = require('jsonwebtoken');
// decode,verify, sign

const value = {
  name: 'mJoker',
  accountNumber: 432324324,
};

// sign and not generate
const token = jwt.sign(value, 'fewfergfreg');
console.log(token);
// anyone can see the contnet of the jwt token but verify is only done by the server
