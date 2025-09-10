const express = require('express')
const router = express.Router()

const userRouter = require('./user_router')
const adminRouter = require('./admin_router')
const bookingRouter = require('./booking_router')
const categoryRouter = require('./category_router')
const favoriteRouter = require('./favorite_router')
const guideAssignmentRouter = require('./guide_assignment_router')
const guideEvaluationRouter = require('./guide_evaluation_router')
const hotelRouter = require('./hotel_router')
const locationRouter = require('./location_router')
const paymentRouter = require('./payment_router')
const reviewRouter = require('./review_router')
const tourRouter = require('./tour_router')
const tourGuideRouter = require('./tour_guide_router')
const tourImageRouter = require('./tour_image_router')
const tourItinerarieRouter = require('./tour_itinerarie_router')
const tourManagerRouter = require('./tour_manager_router')
const tourScheduleRouter = require('./tour_schedule_router')
const userCompletedTourRouter = require('./user_completed_tour_router')
const userNotificationRouter = require('./user_notification_router')
const userStatsRouter = require('./user_stats_router')
const hotelImageRouter = require('./hotel_image_router')




router.use('/hotel-images', hotelImageRouter)
router.use('/user-stats', userStatsRouter)
router.use('/user-notifications', userNotificationRouter)
router.use('/user-completed-tours', userCompletedTourRouter)
router.use('/tour-schedules', tourScheduleRouter)
router.use('/tour-managers', tourManagerRouter)
router.use('/tour-itineraries', tourItinerarieRouter)
router.use('/tour-images', tourImageRouter)
router.use('/tour-guides', tourGuideRouter)
router.use('/tours', tourRouter)
router.use('/users', userRouter)
router.use('/admins', adminRouter)
router.use('/bookings', bookingRouter)
router.use('/categorys', categoryRouter)
router.use('/favorites', favoriteRouter)
router.use('/guide-assignments', guideAssignmentRouter)
router.use('/guide-evaluations', guideEvaluationRouter)
router.use('/hotels', hotelRouter)
router.use('/locations', locationRouter)
router.use('/payments', paymentRouter)
router.use('/reviews', reviewRouter)


module.exports = router


