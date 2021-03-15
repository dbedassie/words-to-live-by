/* - Here is all of the js from client-side - */
const adviceURL = 'https://api.adviceslip.com/advice';

const adviceList = {};

const dataLoaded = (e) => {
    const xhr = e.target;
    const obj = JSON.parse(xhr.responseText);

    console.dir(obj);

    /*
    const div = document.createElement('div');
    div.className = 'adviceClass';
    const advice = `<p>${obj.slip.advice}</p>`;
    previousAdvice = advice;
    div.innerHTML = advice;
    document.querySelector('#advice').appendChild(div);
    */

    const text = document.querySelector('#currentAdvice');
    text.innerHTML = `${obj.slip.advice}`;
};

const handleResponse = (xhr, parseResponse) => {
    const content = document.querySelector('#content');
    
    switch(xhr.status) {
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
            content.innerHTML = '<p>Error code not implemented by client</p>'
            break;
    }
    
    if(parseResponse) {
        const obj = JSON.parse(xhr.response);
        console.dir(obj);
        
        content.innerHTML += `<p>${xhr.response}</p>`;
    } else {
        return;
    }
};

/**
 * This will add the randomly generated advice into the user's advice.
 */
const addAdvice = () => {
    if(document.querySelector('#startText')){
        document.querySelector('#startText').remove();
    }
    const randomAdvice = document.querySelector('#currentAdvice').innerHTML;
    const a = document.createElement('a');
    a.setAttribute("id", "note");
    const advice = document.querySelector('#advice');
    const text = `<h4>Generated</h4><br><p>${randomAdvice}</p>`;
    a.innerHTML = text;
    advice.appendChild(a);
};

/**
 * Handles post requests for adding your own advice.
 * @param {*} e 
 * @param {*} adviceForm 
 */
const postAdvice = (e, adviceForm) => {
    e.preventDefault();

    if(document.querySelector('#startText')){
        document.querySelector('#startText').remove();
    }

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

    addUserAdvice(index.value, advice.value);

    return false;
};

// Adds user inputted advice to screen, and checks to see if content needs to be updated
// on client-side.
const addUserAdvice = (index, advice) => {
    if (adviceList[index]) {
        const currentAdvice = document.getElementsByTagName('a');
        for(let i = 0; i < currentAdvice.length; i++) {
            const text = currentAdvice[i].innerHTML;
            let check = text.split("</h4>");
            if(check[0] === `<h4>${index}`) {
                currentAdvice[i].innerHTML = `<h4>${index}</h4><br><p>${advice}</p>`;
                console.log(currentAdvice[i].innerHTML);
            }
        }
    } else {
        adviceList[index] = {};
        adviceList[index].advice = advice;
        adviceList[index].index = index;
        const adviceToAdd = `<h4>${index}</h4><br><p>${advice}</p>`;
        const a = document.createElement('a');
        a.setAttribute("id", "note");
        const div = document.querySelector('#advice');
        a.innerHTML = adviceToAdd;
        div.appendChild(a);
    }
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
    getData(search);
};

const openNav = () => {
    document.querySelector('#sidebar').style.width = '250px';
    document.querySelector('main').style.marginLeft = '250px';
    document.querySelector('.openBtn').style.visibility = 'hidden';
};

const closeNav = () => {
    document.querySelector('#sidebar').style.width = '0';
    document.querySelector('main').style.marginLeft = '0';
    document.querySelector('.openBtn').style.visibility = 'visible';
};



const init = () => {
    const adviceForm = document.querySelector('#adviceForm');
    const addAdvice = (e) => postAdvice(e, adviceForm);
    adviceForm.addEventListener('submit', addAdvice);
    const searchAdvice = document.querySelector('#searchBtn');
    searchAdvice.onclick = onSearch;
};

window.onload = init;