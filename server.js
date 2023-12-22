const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  // Serve the HTML file for any route
  if (req.url === '/' || req.url === '/index.html') {
    fs.readFile('index.html', 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  }

  // Handle form submissions
  if (req.method === 'POST' && req.url === '/submit') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const formData = parseFormData(body);
      console.log('Form data submitted:', formData);

      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Form submitted successfully!');
    });
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

function parseFormData(body) {
  return body.split('&').reduce((acc, pair) => {
    const [key, value] = pair.split('=');
    acc[key] = decodeURIComponent(value);
    return acc;
  }, {});
}
