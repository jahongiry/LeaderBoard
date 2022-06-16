import './style.css';

const refresh = document.querySelector('.refresh');
const urlsecond = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/wGUQ0WRcKqubN1AuzRLg/scores';
const submit = document.querySelector('.submit');
const nameList = document.querySelector('.name-lists');

const apiUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games';
fetch(apiUrl, {
  method: 'Post',
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
  body: JSON.stringify({
    name: 'Jahongir Game',
  }),
})
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
  });

submit.addEventListener('click', () => {
  const nameInput = document.querySelector('.name-input');
  const scoreInput = document.querySelector('.score-input');
  fetch(urlsecond, {
    method: 'Post',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      user: `${nameInput.value}`,
      score: `${scoreInput.value}`,
    }),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
  nameInput.value = '';
  scoreInput.value = '';
});

async function getUserScoresPromise(url) {
  let user;
  let data;
  try {
    const response = await fetch(url);
    data = await response.json();
    user = data.result;
  } catch (e) {
    console.log(`Error: ${e}`);
  }

  while (nameList.hasChildNodes()) {
    nameList.removeChild(nameList.firstChild);
  }

  for (let i = 0; i < data.result.length; i += 1) {
    const list = document.createElement('li');
    list.classList.add('name-list');
    const texting = document.createTextNode(`${user[i].user}: ${user[i].score}`);
    list.appendChild(texting);
    nameList.appendChild(list);
  }
}

getUserScoresPromise(urlsecond);

refresh.addEventListener('click', () => {
  getUserScoresPromise(urlsecond);
});