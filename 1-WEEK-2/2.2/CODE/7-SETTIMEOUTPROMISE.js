function setTimeoutPromisified(time) {
  function doSomething(resolve) {
    setTimeout(resolve, time);
  }
  return new Promise(doSomething);
}

function callback() {
  console.log('time has passed');
}
const p = setTimeoutPromisified(1000);
p.then(callback);
//

const pr = new Promise(function (resolve, reject) {
  let c = 10;
  for (let i = 0; i < 1000; i++) {
    c++;
  }
  resolve(c);
  //   if we dont call resolve callback is called if we dont callback is dont pull
});
function callback(c) {
  console.log('here we pass c from the previous reoved function', c);
}
pr.then((res) => console.log(res)).then(callback);
// teleport whever we pass the resolve with soomehting is the same thing the next then onfulfilment function get the value

//
//
function doTimeCall(resolve) {
  console.log('here from dotimecall');
  resolve();
  //   same as anonymous function
}
function setTimoutAsync() {
  return new Promise(doTimeCall);
}
const pp = setTimoutAsync();
pp.then(function () {
  console.log('hi');
});
