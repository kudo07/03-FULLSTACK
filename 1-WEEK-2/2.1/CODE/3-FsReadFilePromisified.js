const fs = require('fs');
const util = require('util');

const readFilePromise = util.promisify(fs.readFile);

readFilePromise('example.txt', 'utf-8')
  .then((data) => console.log(data))
  .catch((error) => console.error('Error reading file:', error));

const fs = require('fs').promises;
// basic
async function readFileAsync(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error reading file:', error);
    throw error;
  }
}

// Usage
readFileAsync('example.txt').catch(console.error);
