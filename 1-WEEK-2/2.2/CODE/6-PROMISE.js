// a promise i simply a proxy to the async function
function doAsync(resolve) {
  setTimeout(resolve, 3000);
  // old, callback based async funcion
}
const p = new Promise(doAsync);
function callback() {
  console.log('3 seconds have passed');
}
p.then(callback);
// promise will reoslve and then callback will be called
