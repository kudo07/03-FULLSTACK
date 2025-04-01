class Promise2 {
  constructor(fn) {
    //     (resolve) => {
    //   console.log(resolve);
    //   setTimeout(resolve, duration);
    // }
    // fn is this
    this.fn = fn;
    this.fn(() => {
      this.resolve.forEach((fn) => fn());
    });
    // we pass
    // () => {
    //   this.resolve.forEach((fn) => fn());
    // });
    // to the promise
  }
  then(fn) {
    if (!this.resolve) {
      this.resolve = [];
    }
    this.resolve.push(fn);
  }
}

function setTimeoutPromisified(duration) {
  return new Promise2((resolve) => {
    // () => {
    // this.resolve.forEach((fn) => fn());
    // }
    console.log(resolve);
    setTimeout(resolve, duration);
    // resolve is
    // () => {
    // this.resolve.forEach((fn) => fn());
    // }
    // which is later executes after the then register the whole this function
    // function () {
    // console.log('hi');
    // setTimeoutPromisified(2000).then(function () {
    //   console.log('hello');
    // });
    // inside the array after completing 1sec we start executing the callback which is resolve which is
    //  () => {
    // this.resolve.forEach((fn) => fn());
    // }
    // now reolve is this callback and this is executing then fn is fn()
    // which is
    // function () {
    // console.log('hi');
    // setTimeoutPromisified(2000).then(function () {
    //   console.log('hello');
    // });
    // executing log 'hi'
    // same repeat process for second timer
  });
}

setTimeoutPromisified(1000).then(function () {
  console.log('hi');
  setTimeoutPromisified(2000).then(function () {
    console.log('hello');
  });
});
// () => {
//       this.resolve.forEach((fn) => fn());
//     }.we passed this in the promise2
// resolve is this
// this.fn(() => {
//     this.resolve.forEach((fn) => fn());
//   });
// here we passed this
// ()=>{}
// in the prmose
// name resolve
// log resolve
// is this function anonymous
// () => {
// //       this.resolve.forEach((fn) => fn());
// //     }
// after 1 sec this call
// when then is executes and resolve array contains fn
//then stores function () { console.log('hi'); ... } inside this.resolve array.
// after 1 sec resolve() executes
// () => { this.resolve.forEach((fn) => fn()); }
//Calls each function inside this.resolve, so it calls:
// Calls each function inside this.resolve, so it calls
// function () { console.log('hi'); ... }
// Logs "hi".

// Calls setTimeoutPromisified(2000), which creates a new Promise2 instance.

// The second setTimeoutPromisified(2000).then(...):

// Works exactly like the first one but waits for 2 seconds before logging "hello".
