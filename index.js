const fs = require('fs');
const http = require('http');
const url = require('url');

///////////////////////////////
// SERVER

const tempOverview = fs.readFileSync(`${__dirname}/templates/overview-template.html`, 'utf-8');

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // Overview Page
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'content-type': 'text/html' });
    res.end(tempOverview);
  } else if (pathname === '/userdetails') {
    res.end('this is the userdetails Page');
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'this is just a just for me',
    });
    res.end('<h1>Page not found!</h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requests on port 8000');
});
