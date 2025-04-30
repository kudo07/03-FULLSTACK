// join
// simple code fetch 2 table without joins

const { Client } = require('pg');
async function getUserDetailsAndAddressSeparately(userId) {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: 'mysecretpassword',
  });

  try {
    await client.connect();

    // Fetch user details
    const userDetailsQuery =
      'SELECT id, username, email FROM users WHERE id = $1';
    const userDetails = await client.query(userDetailsQuery, [userId]);

    // Fetch user address
    const userAddressQuery =
      'SELECT city, country, street, pincode FROM addresses WHERE user_id = $1';
    const userAddress = await client.query(userAddressQuery, [userId]);

    if (userDetails.rows.length > 0) {
      console.log('User found:', userDetails.rows[0]);
      console.log(
        'Address:',
        userAddress.rows.length > 0 ? userAddress.rows[0] : 'No address found'
      );
      return {
        user: userDetails.rows[0],
        address: userAddress.rows.length > 0 ? userAddress.rows[0] : null,
      };
    } else {
      console.log('No user found with the given ID.');
      return null;
    }
  } catch (err) {
    console.error('Error during fetching user and address:', err);
    throw err;
  } finally {
    await client.end();
  }
}
getUserDetailsAndAddressSeparately('1');
