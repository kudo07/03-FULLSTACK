import { Client } from 'pg';
// const client = new Client({
//   connectionString: '',
//   //   neon db string here
// });

const client = new Client({
  connectionString: 'postgresql://postgres:Emptiness123$@localhost/postgres',
});

async function createUserTable() {
  try {
    await client.connect();
    const result = await client.query(`
      CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Table created successfully');
  } catch (err) {
    console.error('Error creating table:', err);
  } finally {
    await client.end();
  }
}

createUserTable();
