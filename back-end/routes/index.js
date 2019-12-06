const router = require("express").Router();
const userController = require('../controllers/users');
const transportTypeController = require('../controllers/transportType')
const reviewsController = require('../controllers/reviews')
const verifyAuth = require('../controllers/middlewares').verifyToken;
const Review = require("../models").Reviews;


//iris
router.get('/transport-type/type',transportTypeController.getAllTranportTypesByType);


router.post('/register', userController.registerUser);
//route for login an user with credentials
router.post('/login', userController.login);
router.post('/logout', userController.logout);

//get all reviews
router.get('/reviews', reviewsController.getAllReviews);
//update a review
router.put('/reviews/:id', verifyAuth, reviewsController.updateReview);
//get all transport types
router.get('/transport-type', transportTypeController.getAllTransportTypes);

//post method
//create a new review given the set of date from the request
router.post('/reviews', verifyAuth, (req, res) => {
    const leavingPoint = req.body.leaving_point;
    Review.create({
        leaving_point: req.body.leaving_point,
        arriving_point: req.body.arriving_point,
        leaving_hour: req.body.leaving_hour,
        duration: req.body.duration,
        observations: req.body.observations,
        rating: req.body.rating,
        congestion_level: req.body.congestion_level,
        userId: req.body.userId,
        transportTypeId: req.body.transportTypeId
    })
    return res.send(`Review created`);

})

module.exports = router;