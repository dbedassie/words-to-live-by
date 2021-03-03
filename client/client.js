/* - Here is all of the js from client-side - */
const adviceURL = 'https://api.adviceslip.com/advice';

const getAdvice = () =>{

};

const dataLoaded = (e) => {
    const xhr = e.target;
    const obj = JSON.parse(xhr.responseText);

    console.dir(obj);

    const advice = `<p>${obj.slip.advice}</p>\n`;
    const body = document.querySelector('#advice');
    body.innerHTML += advice;
};

const getData = (url) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = dataLoaded;
    xhr.onerror = func = () => {return console.log('An error has occurred.');};

    xhr.open('GET', url);
    xhr.send();
};

const onSearch = (e) => {
    let search = adviceURL;
    //let searchTerms = document.querySelector('#searchBar').value;

    getData(search);
}

const init = () => {
    document.querySelector('#moreAdvice').onclick = onSearch;
};

window.onload = init;