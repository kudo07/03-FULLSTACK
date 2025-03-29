const fs = require('fs');
const path = require('path');
function setTimeoutPromisified(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function afterDone() {
  console.log('5 seconds have passed');
}

// let p = setTimeoutPromisified(5000).then(afterDone);
// console.log(p);

function waitFor3s(resolve) {
  // resolve==> main
  setTimeout(resolve, 3000);
}

function main() {
  console.log('main is cleared');
}

waitFor3s(main);

//
function waitFor3s(resolve) {
  setTimeout(resolve, 3000);
}
function setTimeoutPromisified() {
  return new Promise(waitFor3s);
  //   return new Promise(()=>{
  // setTimeout(resolve,3000)
  // })
}
setTimeoutPromisified().then(main);

//
function random() {}

let pe = new Promise(random);
// log pe==> pending Promise

// using eventual value returned by the promise
function callback() {
  console.log('promise success');
}
p.then(callback);
//
//
//
function randomOne(resolve, reject) {
  if (2 === 1) {
    reject();
  } else {
    // resolve();
  }
  //   reject()
  //  nothing will print
  // the passed function which is randomOne here has two functions resolve and reject
  //   needs to tell to resolve when resolved then call then functions
}

let por = new Promise(randomOne);
// pass the function in the promise

// using the eventual value returned by the promise

function callbackOne() {
  console.log('promise succeded');
}

p.then(callbackOne);
//
//
//
function readFile(filename) {
  return new Promise((resolve, reject) => {
    // .in promise there is function and again resolve and reejct is again a function
    // Simulating file read operation
    if (true) {
      console.log('here');
      resolve(2);
      //   after resolve we proceed to then
      // here neeche
    } else {
      reject(new Error('Failed to read file'));
    }
  });
}

// Using `.then()` to handle the promise
readFile('a.txt')
  // here
  // again there is callback or anonymous function which take the result from the previous resolved
  .then((res) => {
    console.log('after resolved the promise', res);
  })
  .catch((err) => console.error('Error:', err));

// OR using async/await inside an async function
async function execute() {
  try {
    const proxy = await readFile('a.txt');
    console.log('after resolved the promise', proxy);
  } catch (err) {
    console.error('Error:', err);
  }
}

execute();
//
function readFile(filename) {
  return new Promise((resolve, reject) => {
    // read the file and return its value
    if (true) {
      console.log('here');

      resolve(2);
    } else {
      reject();
    }
  });
}
const proxy = readFile('a.txt');
// proxy to the final value because proxy is not come yet
proxy.then((res) => {
  console.log('after reolved the promise ', res);
});

//

function readFile(filename) {
  // read the file and return its value
  // in promise there is 2 function resolve and resject which passed inside the function or anonymous function
  return new Promise((resolve, reject) => {});
}
const pere = readFile('a.txt');
function callback(contents) {
  console.log(contents);
}
pere.then(callback);
// the previous value of promise resolved is ggeting here in the callback
// whenver p resolves content logs krdo idr
// whenever get the value of the p pleae print the callback

// CREATION
// whenever PROMISE IS CREATED IT GET THE FIRST IS FUNCTION WHICH RESOLVE

// ṆORMAL

function readFile() {
  return new Promise((resolve, reject) => {
    const fileName = path.join(__dirname, 'a.txt');
    fs.readFile(fileName, 'utf-8', (err, data) => {
      if (err) {
        reject(err); // Reject the promise if an error occurs
      } else {
        resolve(data); // Resolve the promise with file content
      }
    });
  });
}

readFile()
  .then((contents) => {
    console.log('File Contents:', contents);
  })
  .catch((error) => {
    console.error('Error reading file:', error);
  });
// creating top level await
// 1-
// async main(){}

// main()

//2iife
(async () => {})();
//

function readTheFileOne(sendTheFinalValueHere) {
  fs.readFile('a.txt', 'utf-8', function (err, data) {
    sendTheFinalValueHere(data);
  });
}

function readFileOne(filename) {
  return new Promise(readTheFileOne);
}
const Promise = readFile();
function callbackOne(contents) {
  console.log(contents);
}

Promise.then(callback);
// how the data following from sendthefinalvaluehere to the this callback function which is contents
//  we created the PromiseTwo class which takes fn
// fn here is readTheFileWith which passed here which takes argument resolve which is a function after resolve we proceed to then function
// ṇow resolve currently is undefined until then proceed so readthefile executing starting when its inside the PromiseTwo so
// after exectuting after 3 sec the then function runs which takes the callback and then methods in the promise which make this.resolve=resolve
// in which resolve is callback assgin value and in then fn(resolve)==> readthefile(callbackkk) which consolesafter 3 sec till sec resolve is undefined
// after 3 secs resolve get the callback because it asign the resolve
// here this refers here as the object which is PromiseTwo
class PromiseTwo {
  contructor(fn) {
    this.resolve = null;
    // fn==>readTheFileWith
    // with immediate execution of the readTheFileWith
    function afterDone() {
      this.resolve();
    }
    fn(afterDone);
    // afterDone is argument which is resolve overe here
    // after call afterDone call this.resolve()
    // whent this.resolve() set
  }
  //in the then variabel
  then(callback) {
    // this inside PromiseTwo refers to the instance of PromiseTwo, not readTheFileWith.
    this.resolve = callback;
    // this.color='red'
    // we store variable name resolve whatever we get callback
    // in this case callback is functoin
  }
}

function readTheFileWith(resolve) {
  setTimeout(function () {
    console.log('callback based settimeout completed');
    resolve();
  }, 3000);
}

function setTimeoutPromisifiedWith() {
  // whenever creating the instance of Promise give me the funtion
  return new PromiseTwo(readTheFileWith);
}
let ourPromise = setTimeoutPromisifiedWith();
function callbackWith() {
  console.log('callback has been called');
}
ourPromise.then(callbackWith);
//whenever the async operation succeed 'readTheFIle' whever it called the first argument which is resolve()

//in the fucntion readTheFile the first argument which is sending resolve in the Promise
// which is afterDone
// which sets the this.resolve()
// and resolve stores which is variable has the callback which callback has call
