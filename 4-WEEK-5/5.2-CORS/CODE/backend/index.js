const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());

// this file will be serve without the cors
// for the public index html serve
// app.get('/', (req, res) => {
//   console.log(__dirname + '/public/inde.html');

//   res.sendFile(__dirname + '/public/index.html');
// });

// to access the frontend file
app.use(cors());
app.use(express.json());
app.post('/', (req, res) => {
  const a = parseInt(req.body.a);
  const b = parseInt(req.body.b);
  res.json({ answer: a + b });
});

app.listen(3000);
