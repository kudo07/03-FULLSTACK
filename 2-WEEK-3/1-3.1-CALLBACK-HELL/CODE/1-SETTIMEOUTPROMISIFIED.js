function settimeoutPromisified(duration) {
  return new Promise(function (resolve, reject) {
    // setTimeout(resolve, duration);
    setTimeout(() => {
      if (duration > 0) {
        resolve();
      } else {
        reject();
      }
    }, 1000);
  });
}

function callback() {
  console.log('1SEC has passed');
}
settimeoutPromisified(1000).then(callback);

// hell
settimeoutPromisified(1000).then(function () {
  console.log('hig');
  settimeoutPromisified(2000).then(function () {
    console.log('there');
    settimeoutPromisified(3000).then(callback);
  });
});

// /PROMISE CHAINING
settimeoutPromisified(1000)
  .then(function () {
    console.log('hi');
    return settimeoutPromisified(3000);
  })
  .then(function () {
    console.log('hell');
  })
  .then(callback);
console.log('outside the callback hell');
