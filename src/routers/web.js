const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send(`
    <html>
      <head>
        <title>Hello World</title>
        <style>
          body { display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
          h1 { font-size: 3em; }
        </style>
      </head>
      <body>
        <h1>Hello World!</h1>
      </body>
    </html>
  `)
})

module.exports = router