const express = require('express');
const app = express();

function isOldEnough(req, res, next) {
  const age = req.query.age;
  if (age >= 14) {
    next();
  } else {
    res.json({
      msg: 'Sorry you are not of agenext()',
    });
  }
}

app.get('/ride', isOldEnough, function (req, res) {
  res.json({
    msg: 'You have been suceesfully ridden the ride 2',
  });
});
app.listen(3000);
// http://localhost:3000/ride?age=15
// for ride 2 is same process redundancy code as always check the age parameter
