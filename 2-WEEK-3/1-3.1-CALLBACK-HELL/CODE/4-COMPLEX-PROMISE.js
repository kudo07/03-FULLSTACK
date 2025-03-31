class Promise2 {
  constructor(fn) {
    this.fn = fn;
    this.fn(() => {
      this.resolve.forEach((fn) => fn());
    });
  }
  then(fn) {
    if (!this.resolve) {
      this.resolve = [];
    }
    this.resolve.push(fn);
  }
}
function setTimeoutPromisified(duration) {
  return new Promise2(function (resolve) {
    console.log(resolve);
    setTimeout(resolve, duration);
  });
}

setTimeoutPromisified(1000).then(function () {
  console.log('hi');
  setTimeoutPromisified(2000).then(function () {
    console.log('hello');
  });
});
// whenever we define a promise we pass the big function
