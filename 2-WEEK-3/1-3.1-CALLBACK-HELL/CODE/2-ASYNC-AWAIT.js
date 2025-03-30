function setTimeoutPromisified() {
  return new Promise(function (resolve) {
    setTimeoutPromisified(resolve, duration);
  });
}

async function solve() {
  await setTimeoutPromisified(1000);
  console.log('hi');
  await setTimeoutPromisified(3000);
  console.log('hello');
  await setTimeoutPromisified(5000);
  console.log('hi there');
}
