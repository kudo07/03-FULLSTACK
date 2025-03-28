//1-BASIC PROMISE FETCH
function fetchData(url) {
  return fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error!`);
      }
      return res.json();
    })
    .catch((err) => {
      throw err;
    });
}
fetchData('https://jsonplaceholder.typicode.com/todos/1').then((data) =>
  console.log(data)
);

// PROMISIFIED FETCH WITH ASYNC / AWAIT

async function fetchDataTwo(url) {
  try {
    const res = await fetch(url);
    return await res.json();
  } catch (error) {
    throw error;
  }
}
fetchDataTwo('https://jsonplaceholder.typicode.com/todos/1').then((data) =>
  console.log(data)
);

// 3-CUSTOM PROMISIFIED FUNCTION

function customFetch(url, options = {}) {
  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then((res) => {
        if (!res.ok) {
          reject(new Error('http error'));
        }
        return res.json();
      })
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
}

customFetch('https://jsonplaceholder.typicode.com/todos/1')
  .then((data) => console.log(data))
  .catch((err) => console.error(err));
