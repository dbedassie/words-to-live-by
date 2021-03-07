const userAdvice = {};
let count = 0;

/*
    - Helper function for GET requests.
*/
const respondJSON = (request, response, status, object) => {
    const headers = {
        'Content-Type' : 'application/json',
    };

    response.writeHead(status, headers);
    response.write(JSON.stringify(object));
    response.end();
};

/*
    - Helper method for HEAD requests.
*/
const respondJSONMeta = (request, response, status) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    response.writeHead(status, headers);
    response.end();
};

const addAdvice = (request, response, body) =>{
    const resJSON = {
        message: 'Advice is required!',
    };

    if(!body.advice) {
        resJSON.id = 'missingParams';
        return respondJSON(request, response, 400, resJSON);
    } else {
        userAdvice[count].advice = body.advice;
        resJSON.message = 'Created Successfully';
        return respondJSON(request, response, 201, resJSON);
    }
};


/*
    - The GET request function for 404.
*/
const notFound = (request, response) => {
    const resJSON = {
        message: 'The page you are looking for was not found :(',
        id: 'notFound',
    };

    return respondJSON(request, response, 404, resJSON);
};

/*
    - The HEAD request function for 404.
*/
const notFoundMeta = (request, response) => {
    return respondJSONMeta(request, response, 404);
};

const addAdvice = (request, response, body) => {
    const resJSON = {
        message: 'You need to type in some advice!',
        id: 'addAdvice',
    };

    if(!body.advice){
        resJSON.id = 'missingParams';
        return respondJSON(request, response, 400, resJSON);
    }
    
    resJSON.message = 'Advice created successfully';
    return respondJSON(request, response, 201, resJSON);
};

const getAdvice = (request, response) => {
    const resJSON = {
        message: 'Advice data here.',
        id: 'getAdvice',
    };

    return respondJSON(request, response, 200, resJSON);
}

const getAdviceMeta = (request, response) => { return respondJSONMeta(request, response, 200) };

module.exports = {
    getAdvice,
    getAdviceMeta,
    notFound,
    notFoundMeta,
};