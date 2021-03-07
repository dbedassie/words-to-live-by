/* - Here is all of the js from client-side - */
const adviceURL = 'https://api.adviceslip.com/advice';
let previousAdvice = "";
let addedAdvice = [];

const dataLoaded = e => {
  const xhr = e.target;
  const obj = JSON.parse(xhr.responseText);
  console.dir(obj);
  const div = document.createElement('div');
  div.className = 'adviceClass';
  const advice = `<p>${obj.slip.advice}</p>`;
  previousAdvice = advice;
  div.innerHTML = advice;
  document.querySelector('#advice').appendChild(div);
};

const getData = url => {
  const xhr = new XMLHttpRequest();
  xhr.onload = dataLoaded;

  xhr.onerror = func = () => {
    return console.log('An error has occurred.');
  };

  xhr.open('GET', url);
  xhr.send();
};

const onSearch = e => {
  let search = adviceURL;
  getData(search);
};

const init = () => {
  document.querySelector('#moreAdvice').onclick = onSearch;
};

window.onload = init;
