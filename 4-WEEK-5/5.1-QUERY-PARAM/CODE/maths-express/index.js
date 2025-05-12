const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('data');
});

app.get('/:a/:b', (req, res) => {
  // http://localhost:3000/1/3
  const a = req.params.a;
  const b = req.params.b;
  res.send(a + b);
});
app.get('/mul', (req, res) => {
  // http://localhost:3000/mul?a=2&b=3
  const a = req.query.a;
  const b = req.query.b;

  res.send(a * b);
});

app.listen(3000);
