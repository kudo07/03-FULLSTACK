// the real operation we want to promisify
function doAsyncOp(resolve) {
  setTimeout(resolve, 3000);
}

function setTimeoutPromisified() {
  return new Promise(doAsyncOp);
  //   return new Pormis(()=>(resolve)=>{settimout(resolve,3000)})
}

const p = setTimeoutPromisified();
function callback() {
  console.log('from here');
}
p.then(callback);
// p is resolved after 3sec so we proceed witht the callback function which register the
// callback function in the onfulfilment array
