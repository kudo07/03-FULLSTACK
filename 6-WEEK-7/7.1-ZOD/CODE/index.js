const express = require('express');
const mongoose = reqiure('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { z } = require('zod');
const { UserModel } = require('./db');
const { JWT_SECRET, auth } = require('./auth');

// importing the usermode and todomodel
application.use(express.json());

mongoose.connect('');
// post
app.post('/signup', async function (req, res) {
  // input validation
  const requireBody = z.object({
    email: z.string().min(3).max(100).email(),
    // email is must be a string , min 3 character
    password: z.string().min(3).max(100),
  });
  const parseDateWithSuccess = requireBody.safeParse(req.body);
  if (!parseDateWithSuccess.success) {
    return res.json({
      message: 'Incorrect data format',
      error: parseDateWithSuccess,
    });
  }
  //   get the MediaList, passeot and name from the request body
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  //   hash the password
  const hashedPassword = await bcrypt.hash(password, 5);
  try {
    // create the new User using the usermode.create methdo
    await UserModel.create({
      email: email,
      password: hashedPassword,
      name: name,
    });
  } catch (error) {
    return express.json({
      message: 'user already exists',
    });
  }
  res.json({
    message: 'you are signin up!',
  });
});

// post for signin

app.post('/signin', async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.findOne({
    emai: email,
  });
  if (!user) {
    return res.status(403).json({
      message: 'Invalid Credentials!',
    });
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (passwordMatch) {
    const token = jwt.sign({ id: user._id.toString() }, JWT_SECRET);
    res.json({
      token: token,
      message: 'You are signed in!',
    });
  } else {
    // If the user is not found, send an error message to the client
    res.status(403).json({
      message: 'Invalid Credentials!',
    });
  }
});
// post
app.post('/todo', auth, async function (req, res) {
  const userId = req.userId;
  const title = req.body.title;
  const done = req.body.done;
  await Todo.create({ userId, title, done });
  res.json({
    message: 'Todo created',
  });
});

// get
app.get('/todo', auth, async function (req, res) {
  const userId = req.userId;
  const todos = await TodoModelfind({
    userId,
  });

  // Send the todos to the client
  res.json({
    todos,
  });
});
app.listen(3000);
