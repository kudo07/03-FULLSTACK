const express = require('express');
const app = express();

function isOldEnough(age) {
  if (age >= 14) {
    return true;
  } else {
    return false;
  }
}

app.get('/ride', function (req, res) {
  if (isOldEnough(req.query.age)) {
    res.json({
      msg: 'you have successfully riden the ride 1',
    });
  } else {
    res.status(411).json({
      msg: 'Sorry you are not age yet',
    });
  }
});
app.listen(3000);
// http://localhost:3000/ride?age=15
// for ride 2 is same process redundancy code as always check the age parameter
