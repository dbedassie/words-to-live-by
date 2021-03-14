const userAdvice = {};

/*
    - Helper function for GET requests.
*/
const respondJSON = (request, response, status, object) => {
  const headers = {
    'Content-Type': 'application/json',
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

const addAdvice = (request, response, body) => {
  const resJSON = {
    message: 'Advice is required!',
  };

  if (!body.advice && !body.index) {
    resJSON.id = 'missingParams';
    return respondJSON(request, response, 400, resJSON);
  }

  let responseCode = 201;

  if(userAdvice[body.index]) {
    responseCode = 204;
  } else {
    userAdvice[body.index] = {};
  }

  userAdvice[body.index].index = body.index;
  userAdvice[body.index].advice = body.advice;

  if (responseCode === 201) {
    resJSON.message = 'Created successfully.';
    return respondJSON(request, response, responseCode, resJSON);
  }
  return respondJSONMeta(request, response, responseCode);
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
const notFoundMeta = (request, response) => respondJSONMeta(request, response, 404);

const getAdvice = (request, response) => {
  const resJSON = {
    message: 'Advice data here.',
    id: 'getAdvice',
  };

  return respondJSON(request, response, 200, resJSON);
};

const getAdviceMeta = (request, response) => respondJSONMeta(request, response, 200);

module.exports = {
  addAdvice,
  getAdvice,
  getAdviceMeta,
  notFound,
  notFoundMeta,
};
