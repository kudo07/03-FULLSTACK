// class PromiseTwo {
//   constructor(executor) {
//     this.resolve = undefined; // Initially undefined
//     this.reject = undefined;

//     const afterDone = () => {
//       console.log('Executing afterDone...');
//       this.resolve(); // This will call the function assigned in `.then()`
//     };

//     // Call the executor function and pass `afterDone`
//     executor(afterDone);
//   }

//   then(callbackWith) {
//     console.log('then() is called, assigning resolve to callbackWith');
//     this.resolve = callbackWith; // Assign the function to be executed later
//   }
// }

// function readTheFileWith(afterDone) {
//   console.log('readTheFileWith() called, setting up setTimeout...');

//   setTimeout(() => {
//     console.log('setTimeout finished, calling afterDone()');
//     afterDone(); // Calls this.resolve() after 3 seconds
//   }, 3000);
// }

// // Creating an instance of PromiseTwo
// const p = new PromiseTwo(readTheFileWith);

// // Adding a .then callback
// p.then(() => {
//   console.log('Callback has been called');
// });

class PromiseTwo {
  constructor(fn) {
    this.resolve = null; // Initialize resolve
    const afterDone = () => {
      this.resolve(); // Corrected: Now this refers to PromiseTwo
    };
    fn(afterDone); // Calls readTheFileWith(afterDone)
  }

  then(callback) {
    this.resolve = callback; // Stores callback in resolve
    // this.resolve=callbackWith
  }
}
// resolve is afterDone
function readTheFileWith(resolve) {
  setTimeout(function () {
    console.log('callback based settimeout completed');
    // till 3sec resolve is undefiend
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
