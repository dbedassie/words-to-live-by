const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

/*
    -   Handler for POST requests
 */
const handlePost = (request, response, parsedUrl) => {
  if (parsedUrl.pathname === '/addAdvice') {
    const body = [];

    // If an error occurs, we will call this
    request.on('error', (err) => {
      console.dir(err);
      response.statusCode = 400;
      response.end();
    });

    // As data gets added, we add it to the body
    request.on('data', (chunk) => {
      body.push(chunk);
    });

    // Once all information comes in, this will occur.
    request.on('end', () => {
      const bodyString = Buffer.concat(body).toString();
      const bodyParams = query.parse(bodyString);

      jsonHandler.addAdvice(request, response, bodyParams);
    });
  }
};

/*
    - Handler for HEAD requests
*/
const handleHead = (request, response, parsedUrl) => {
  if (parsedUrl.pathname === '/notFound') {
    jsonHandler.notFoundMeta(request, response);
  } else {
    jsonHandler.notFoundMeta(request, response);
  }
};

/*
    - Handler for GET requests.
*/
const handleGet = (request, response, parsedUrl) => {
  if(parsedUrl.pathname === '/') {
    htmlHandler.getIndex(request, response);
  } else if (parsedUrl.pathname === '/style.css') {
    htmlHandler.getCSS(request, response);
  } else if (parsedUrl.pathname === '/notFound') {
    jsonHandler.notFound(request, response);
  } else if (parsedUrl.pathname === '/bundle.js') {
    htmlHandler.getBundle(request, response);
  } else {
    jsonHandler.notFound(request, response);
  }
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);

  if (request.method === 'POST') {
    // handle post requests here
    handlePost(request, response, parsedUrl);
  } else if (request.method === 'GET') {
    // handle get requests here
    handleGet(request, response, parsedUrl);
  } else if (request.method === 'HEAD') {
    // handle head requests here
    handleHead(request, response, parsedUrl);
  }

  console.dir(parsedUrl.pathname);
};

http.createServer(onRequest).listen(port);
console.log(`Listening on 127.0.0.1: ${port}`);
