const http = require('http')

const notes = [
  {
      id: 1,
      content: 'First Note',
      date: '2019-09-30T17:32:41.199Z',
      flagged: true
  },
  {
      id: 2,
      content: 'Second Note!',
      date: '2019-08-30T12:13:24.091Z',
      flagged: false
  },
  {
      id: 3,
      content: 'This is our third note.',
      date: '2019-08-30T12:20:14.998Z',
      flagged: true
  }
]

const webApp = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(notes))
})

const PORT = 3001
webApp.listen(PORT)
console.log(`Web server running on port ${PORT}`)