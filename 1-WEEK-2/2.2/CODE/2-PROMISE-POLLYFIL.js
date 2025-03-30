const fs = require('fs').promises;
const path = require('path');
async function cleanFile(filePath) {
  try {
    await fs.unlink(filePath);
    console.log(`file ${filePath} deleted successfully`);
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log(`file ${filePath} not found`);
    } else {
      console.log(error);
    }
  }
}
const fileName = path.join(__dirname, 'a.txt');
cleanFile(fileName);
