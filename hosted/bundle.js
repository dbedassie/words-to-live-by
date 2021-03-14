/* - Here is all of the js from client-side - */
const adviceURL = 'https://api.adviceslip.com/advice';

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

const handleResponse = (xhr, parseResponse) => {
  const content = document.querySelector('#content');

  switch (xhr.status) {
    case 200:
      //content.innerHTML = '<b>Success!</b>';
      alert('Success!');
      break;

    case 201:
      //content.innerHTML = '<b>Created!</b>';
      alert('Created!');
      break;

    case 204:
      //content.innerHTML = '<b>Updated (No Content)!</b>';
      alert('Updated!');
      break;

    case 400:
      //content.innerHTML = '<b>Bad Request</b>';
      alert('Bad Request!');
      break;

    case 404:
      //content.innerHTML = '<b>Resource Not Found</b>';
      alert('not found');
      break;

    default:
      content.innerHTML = '<p>Error code not implemented by client</p>';
      break;
  }

  if (parseResponse) {
    const obj = JSON.parse(xhr.response);
    console.dir(obj);
    content.innerHTML += `<p>${xhr.response}</p>`;
  } else {
    return;
  }
};

const postAdvice = (e, adviceForm) => {
  e.preventDefault();
  const action = adviceForm.getAttribute('action');
  const method = adviceForm.getAttribute('method');
  const advice = adviceForm.querySelector('#adviceField');
  const index = adviceForm.querySelector('#indexField');
  const xhr = new XMLHttpRequest();
  xhr.open(method, action);
  xhr.setRequestHeader('Accept', 'application/json');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  xhr.onload = () => handleResponse(xhr);

  const formData = `advice=${advice.value}&index=${index.value}`;
  xhr.send(formData);
  return false;
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
  const adviceForm = document.querySelector('#adviceForm');

  const addAdvice = e => postAdvice(e, adviceForm);

  adviceForm.addEventListener('submit', addAdvice);
  const searchAdvice = document.querySelector('#searchBtn');
  searchAdvice.onclick = onSearch;
};

window.onload = init;
