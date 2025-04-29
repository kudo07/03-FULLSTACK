// import { Client } from 'pg';
const { Client } = require('pg');
// async funciton to insert data into a table
async function insertData() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: 'Emptiness123$',
  });
  try {
    await client.connect();
    const insertQuery =
      "INSERT INTO users(username,email, password) values('username','abc@gmail.com','hellll')";
    const res = await client.query(insertQuery);
    console.log('insertion success:', res);
  } catch (error) {
    console.log(error);
  } finally {
    await client.end();
  }
}
insertData();
// rename it in index from examplen
