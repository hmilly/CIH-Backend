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


const createServer = (req, res) => {

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
      'Content-Type': 'text/html'
    });
    res.write(`${users.map(u => u.name)}`);
    res.end();

    
  } 
  // else if (req.url === `/api/user/${num}`) {
  //       res.writeHead(200, {
  //     'Content-Type': 'application/json'
  //   });
  //   let userWithId = user.find(u => u.id === num)
  //   let data = {user: userWithId}
  //   res.end(JSON.stringify(data))


  // } 

  else {
    res.end('Error')
  }

}

const server = http.createServer(createServer)
server.listen(3000)
