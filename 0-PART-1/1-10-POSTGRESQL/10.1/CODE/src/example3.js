const { Client } = require('pg');

// async funciton to insert data into a table

async function insertData(username, email, password) {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: 'Emptiness123$',
  });
  try {
    // ensure client connection is established
    await client.connect();
    // use parameterised query to prevent sql injection
    const insertQuery =
      'INSERT INTO users(username,email,password) VALUES($1,$2,$3)';
    const values = [username, email, password];
    const res = await client.query(insertQuery, values);
    console.log('insertion success', res);
  } catch (error) {
    console.log(error);
  } finally {
    //
    await client.end();
  }
}
insertData('username5', 'user5@example.com', 'user_password').catch(
  console.error
);
// node src/index.js
// rename==>example3
