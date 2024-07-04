const http = require('http');
const fs = require('fs');
const path = './backend/data.json';

const readFile = (callback) => {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return callback([]);
    }
    try {
      const json = JSON.parse(data);
      callback(json);
    } catch (e) {
      console.error('Error parsing JSON:', e);
      callback([]);
    }
  });
};

const writeFile = (data, callback) => {
  fs.writeFile(path, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return callback(false);
    }
    callback(true);
  });
};

const server = http.createServer((req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    return res.end();
  }

  if (req.url === '/api/items' && req.method === 'GET') {
    readFile((data) => {
      res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
      res.end(JSON.stringify(data));
    });
  } else if (req.url === '/api/items' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const newItem = JSON.parse(body);
      readFile((data) => {
        data.push(newItem);
        writeFile(data, (success) => {
          res.writeHead(success ? 201 : 500, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
          res.end(JSON.stringify(success ? newItem : { error: 'Error creating item' }));
        });
      });
    });
  } else if (req.url.startsWith('/api/items/') && req.method === 'PUT') {
    const id = parseInt(req.url.split('/').pop());
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const newItem = JSON.parse(body);
      readFile((data) => {
        const index = data.findIndex(item => item.id === id);
        if (index !== -1) {
          data[index] = { ...data[index], ...newItem };
          writeFile(data, (success) => {
            res.writeHead(success ? 200 : 500, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
            res.end(JSON.stringify(success ? data[index] : { error: 'Error updating item' }));
          });
        } else {
          res.writeHead(404, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
          res.end(JSON.stringify({ error: 'Item not found' }));
        }
      });
    });
  } else if (req.url.startsWith('/api/items/') && req.method === 'DELETE') {
    const id = parseInt(req.url.split('/').pop());
    readFile((data) => {
      const newData = data.filter(item => item.id !== id);
      writeFile(newData, (success) => {
        res.writeHead(success ? 200 : 500, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        res.end(JSON.stringify(success ? { success: true } : { error: 'Error deleting item' }));
      });
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*' });
    res.end('Not Found');
  }
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
