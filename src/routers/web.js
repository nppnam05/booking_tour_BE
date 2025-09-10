const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Hello World</title>
        <style>
          body { display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh; margin: 0; }
          h1 { font-size: 3em; }
          h2 { font-size: 2em; margin: 0.2em;}
        </style>
      </head>
      <body>
        <h1>Hello World!</h1>
        <h2>Welcome to my server hẹ hẹ hẹ</h2>
      </body>
    </html>
  `)
})

module.exports = router