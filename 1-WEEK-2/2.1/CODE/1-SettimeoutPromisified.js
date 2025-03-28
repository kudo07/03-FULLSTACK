// setTimeout(() => {
//   console.log('here');
// }, 1000);

// promisified settimeouts

function delay(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`resolved after ${ms} milliseconds`);
    }, ms);
  });
}
async function demo() {
  console.log('start');

  const message = await delay(2000);
  console.log(message);
  console.log('end');
  //   there is not then so we dont register a fucntion for later execution after sync
  // here promise is resolved so it act is sync
}
demo();
