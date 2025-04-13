const path = require('path');
const fs = require('fs');
const { Command } = require('commander');
const program = new Command();
console.log(__dirname);
console.log(path.join(__dirname, 'index.js'));
const thenable = {
  then: function (onFulfiled) {
    setTimeout(() => onFulfiled(42), 1000);
  },
};

async function main() {
  const v = await thenable;
  console.log('hello world');
}

main();

function main1(filename) {
  fs.readFile(filename, 'utf-8', function (err, data) {
    let total = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i] === ' ') {
        total++;
      }
    }
    console.log(total + 1);
  });
}
main1('a.txt');

program
  .name('FIle related cli')
  .description('CLI to do file based taks')
  .version('0.8.0');

program
  .command('count')
  .description('count the number of words in a file')
  .argument('<file>', 'file to count')
  .action((file) => {
    fs.readFile(file, 'utf-8', (err, data) => {
      if (err) {
        console.log(err);
      } else {
        let words = 0;
        for (let i = 0; i < data.length; i++) {
          if (data[i] === ' ') {
            words++;
          }
        }
        console.log(words + 1, file);
      }
    });
  });
program.parse();

// node index.js count path
// node index.js -h
