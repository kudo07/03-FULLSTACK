const express = require('express');

const jwt = require('jsonwebtoken');
const JWT_SECRET = 'random';
const app = express();
app.use(express.json());
// below this middleware this checks the middleware
// where the middleware specifies it check above the code

const users = [];
app.post('/signup', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  users.push({ username: username, password: password });
  res.json({ message: 'You are signed up' });
  console.log(users);
});

app.post('/signin', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  //   maps and folter
  for (let i = 0; i < users.length; i++) {
    if (users[i].username === username && users[i].password === password) {
      foundUser = users[i];
    }
  }
  if (foundUser) {
    const token = jwt.sign(
      {
        username: username,
      },
      JWT_SECRET
    );
    res.json({ token: token });
  } else {
    res.status(403).send({ message: 'INvalid username or password' });
    res.header('jwt', token);
    res.header(
      'random',
      'here we send the token to the header in the response sectionj when we hit api'
    );
    // this is how we send back to the token to the header
  }
  console.log(users);
});
function auth(req, res, next) {
  const token = req.headers.token;
  const decodeToken = jwt.verify(token, JWT_SECRET);
  if (decodeToken.username) {
    req.username = decodeToken.username;
    next();
  } else {
    res.json({ message: 'You are not logged in' });
  }
}
app.post('/me', auth, (req, res) => {
  // const token = req.header.token;
  // const decodedInfo = jwt.verify(token, JWT_SECRET);
  // const unAuthInfo = jwt.decode(token);
  // const username = decodedInfo.username;
  let foundUser = null;
  for (let i = 0; i < users.length; i++) {
    if (users[i].username == req.username) {
      foundUser = users[i];
    }
  }

  if (foundUser) {
    res.json({
      username: foundUser.username,
      password: foundUser.password,
    });
  } else {
    res.json({
      message: 'token invalid',
    });
  }
});

app.listen(3000);
// middle wares
