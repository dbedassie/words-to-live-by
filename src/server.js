const http = require('http');
const url = require('url');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const handlePost = (request, response, parsedUrl) => {

};

const handleHead = (request, response, parsedUrl) => {
    if(parsedUrl.pathname === '/notFound'){
        jsonHandler.notFoundMeta(request, response);
    }
}

const handleGet = (request, response, parsedUrl) => {
    if(parsedUrl.pathname === '/style.css') {
        htmlHandler.getCSS(request, response);
    } else if(parsedUrl.pathname === '/notFound') {
        jsonHandler.notFound(request, response);
    } else if (parsedUrl.pathname === '/bundle.js'){
        htmlHandler.getBundle(request, response);
    } else {
        htmlHandler.getIndex(request, response);
    }
}

const onRequest = (request, response) => {
    const parsedUrl = url.parse(request.url);

    if(request.method === 'POST'){
        // handle post requests here
    } else if(request.method === 'GET'){
        // handle get requests here
        handleGet(request, response, parsedUrl);
    } else if(request.method === 'HEAD'){
        // handle head requests here
    }

    console.dir(parsedUrl.pathname);
};


http.createServer(onRequest).listen(port);
console.log(`Listening on 127.0.0.1: ${port}`);