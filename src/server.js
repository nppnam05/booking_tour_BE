require('dotenv').config();
const express = require('express');
const webRouter = require('./routers/web');
const apiRouter = require('./routers/api');


const app = express() // create express app

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Web routes 
app.use('/', webRouter)

// API routes
app.use('/api', apiRouter)

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found' })
})

// set up server port and host
const port = process.env.PORT || 3000
const host = process.env.HOST_NAME || 'localhost'

app.listen(port, host, () => {
  console.log(`App listening on port ${port}`)
})
