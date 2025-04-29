const { Client } = require('pg');
// TRANSACTIONS AND REALTIONSHIPS
// EXAMPLE 5
async function insertUserAddress(
  username,
  email,
  password,
  city,
  country,
  street,
  pincode
) {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: 'Emptiness123$',
  });

  try {
    await client.connect();

    // Start transaction
    await client.query('BEGIN');

    // Insert user
    const insertUserText = `
            INSERT INTO users (username, email, password)
            VALUES ($1, $2, $3)
            RETURNING id;
        `;
    const userRes = await client.query(insertUserText, [
      username,
      email,
      password,
    ]);
    const userId = userRes.rows[0].id;

    // Insert address using the returned user ID
    const insertAddressText = `
            INSERT INTO addresses (user_id, city, country, street, pincode)
            VALUES ($1, $2, $3, $4, $5);
        `;
    await client.query(insertAddressText, [
      userId,
      city,
      country,
      street,
      pincode,
    ]);

    // Commit transaction
    await client.query('COMMIT');

    console.log('User and address inserted successfully');
  } catch (err) {
    await client.query('ROLLBACK'); // Roll back the transaction on error
    console.error('Error during transaction, rolled back.', err);
    throw err;
  } finally {
    await client.end(); // Close the client connection
  }
}

// Example usage
insertUserAddress(
  'johndoe',
  'john.doe@example.com',
  'securepassword123',
  'New York',
  'USA',
  '123 Broadway St',
  '10001'
);
