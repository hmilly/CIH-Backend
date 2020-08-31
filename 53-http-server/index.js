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

const handleRequest = (request, response) => {









  if (request.url === '/') {
    return response.end('<html><p>Hello</></p></html>')
  }

  if (request.url === '/home') {
    fs.readFileSync('./index.html', 'utf8', (error, data) => {
      if (error) {
        response.end('oops')
      } else {
        response.end(data)
      }
    })
  }
  
  if (request.url === '/api/users') {
    return response.end(`
    <ul>
    ${users.map(u =>
      `<li>${u}</li>`
    )}
    </ul>
    `)
  }
  
  if (request.url === '/') {
    return response.end('<html><p>Hello</></p></html>')
  }
  
  response.end('<html><h2>Error</h2></html>')
}


const server = http.createServer(handleRequest)

server.listen(2000);


