import bodyParser from 'body-parser';
import express from 'express';
const app = express();
app.use(bodyParser.json());
const users = [
  //   0
  {
    name: 'john',
    kidneys: [{ healthy: true }, { healthy: false }, { healthy: true }],
  },
];

app.get('/', (req, res) => {
  const johnKidneys = users[0].kidneys;
  //   console.log(johnKidneys);
  const numberOfKidneys = johnKidneys.length;
  //   filter
  let numberOfHealthyKidneys = 0;
  for (let i = 0; i < johnKidneys.length; i++) {
    if (johnKidneys[i].healthy) {
      numberOfHealthyKidneys++;
    }
  }
  const numberOfUnHealthyKidneys = numberOfKidneys - numberOfHealthyKidneys;
  res.json({
    johnKidneys,
    numberOfHealthyKidneys,
    numberOfUnHealthyKidneys,
    numberOfKidneys,
  });
});

// post
app.post('/', (req, res) => {
  const isHealthy = req.body.isHealthy;
  users[0].kidneys.push({
    healthy: isHealthy,
  });
  res.json({ msg: 'done' });
});

// update
app.put('/', (req, res) => {
  for (let i = 0; i < users.kidneys.length; i++) {
    users[0].kidneys[i].healthy = true;
  }
  res.json({});
});
app.delete('/', (req, res) => {
  const healthyKidneys = users[0].kidneys.filter(
    (kidney) => kidney.healthy === true
  );
  console.log(healthyKidneys);
  users[0].kidneys = healthyKidneys;
  res.json('done');
});

app.listen(3000, (req, res) => {
  console.log('server running');
});
