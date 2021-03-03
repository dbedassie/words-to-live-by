const userAdvice = {};

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

/*
    - The GET request function for 404.
*/
const notFound = (request, response) => {
    const resJSON = {
        message: 'The page you are looking for was not found :(',
        id: 'notFound',
    };

    return respondJSON(request, response, 404, responseJSON);
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
    
}

module.exports = {
    notFound,
    notFoundMeta,
};