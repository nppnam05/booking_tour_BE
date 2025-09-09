require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const webRouter = require('./routers/web');
const userRouter = require('./routers/user_route');



const app = express() // create express app

// Middleware
// Đặt bodyParser ở đây để nó áp dụng cho mọi request
app.use(bodyParser.json()); // cho phép phân tích JSON trong body
app.use(bodyParser.urlencoded({ extended: true })); // cho phép phân tích URL-encoded trong body

app.use('/', webRouter)
app.use('/api/user', userRouter)

// set up server port and host
const port = process.env.PORT || 3000
const host = process.env.HOST_NAME || 'localhost'

app.listen(port, host, () => {
  console.log(`App listening on port ${port}`)
})
