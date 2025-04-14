import express from 'express';
const app = express();

const users = [
  //   0
  {
    name: 'john',
    kidneys: [
      {
        healthy: false,
      },
    ],
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

app.listen(3000, (req, res) => {
  console.log('server running');
});
