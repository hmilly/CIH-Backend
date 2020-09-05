const users = [
  {
    id: 1,
    name: "Vasile",
  },
  {
    id: 2,
    name: "Sam",
  },
  {
    id: 3,
    name: "Alex",
  },
  {
    id: 4,
    name: "Tom",
  },
];

const http = require('http')
const fs = require('fs')


const createServer = () => http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    res.write(`Hello`);
    res.end();

  } else if (req.url === '/home') {
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    fs.readFile('./index.html', 'utf8', (err, data) => {
      if (err) {
        res.writeHead(404);
        res.write('Whoops! File not found!');
      } else {
        res.write(data);
      }
      res.end()
    })

  } else if (req.url === '/api/users') {
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    let eachUser = users.map(u => u)
    eachUser = JSON.stringify(eachUser)
    res.write(`${eachUser}`);
    res.end();
  }

  else if (users.map(u => `/api/user/${u.id}` === req.url)) {
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    let user = users[parseInt(req.url.slice(-1)) - 1]
    user = JSON.stringify(user)
    res.write(`${user}`)
    res.end()
  }

  else {
    res.end('Error')
  }

})

const server = createServer()