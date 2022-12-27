const fs = require('fs');
const http = require('http');
const url = require('url');
const replaceTemplate = require('./modules/replaceTemplate');

///////////////////////////////
// SERVER

const tempOverview = fs.readFileSync(`${__dirname}/templates/overview-template.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/cards-template.html`, 'utf-8');
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`);
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // Overview Page
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'content-type': 'text/html' });

    const usersHtml = dataObj.map((el) => replaceTemplate(tempCard, el)).join('');
    const output = tempOverview.replace('{%USER_CARDS%}', usersHtml);
    res.end(output);
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
