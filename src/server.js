require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const webRouter = require('./routers/web');
const userRouter = require('./routers/user_router');
const adminRouter = require('./routers/admin_router');
const bookingRouter = require('./routers/booking_router');
const categoryRouter = require('./routers/category_router');
const favoriteRouter = require('./routers/favorite_router');
const guideAssignmentRouter = require('./routers/guide_assignment_router');
const guideEvaluationRouter = require('./routers/guide_evaluation_router');
const hotelRouter = require('./routers/hotel_router');



const app = express() // create express app

// Middleware
// Đặt bodyParser ở đây để nó áp dụng cho mọi request
app.use(bodyParser.json()); // cho phép phân tích JSON trong body
app.use(bodyParser.urlencoded({ extended: true })); // cho phép phân tích URL-encoded trong body

app.use('/', webRouter)
app.use('/api/user', userRouter)
app.use('/api/admin', adminRouter)
app.use('/api/booking', bookingRouter)
app.use('/api/category', categoryRouter)
app.use('/api/favorite', favoriteRouter)
app.use('/api/guide-assignment', guideAssignmentRouter)
app.use('/api/guide-evaluation', guideEvaluationRouter)
app.use('/api/hotel', hotelRouter)

// set up server port and host
const port = process.env.PORT || 3000
const host = process.env.HOST_NAME || 'localhost'

app.listen(port, host, () => {
  console.log(`App listening on port ${port}`)
})
