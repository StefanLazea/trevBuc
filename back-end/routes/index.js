const router = require("express").Router();
const userController = require('../controllers/users');
const transportTypeController = require('../controllers/transportType')
const reviewsController = require('../controllers/reviews')
const verifyAuth = require('../controllers/middlewares').verifyToken;
const Review = require("../models").Reviews;

router.post('/register', userController.registerUser);
//route for login an user with credentials
router.post('/login', userController.login);
router.post('/logout', userController.logout);


// REVIEWS

//post method
//create a new review given the set of date from the request
router.post('/reviews',verifyAuth, reviewsController.createReview);

//get all reviews
router.get('/reviews', reviewsController.getAllReviews);

//update a review
router.put('/reviews/:id', verifyAuth, reviewsController.updateReview);

// TRANSPORT-TYPE

//get all transport types
router.get('/transport-type', transportTypeController.getAllTransportTypes);
//create a transport type
router.post('/transport-type',transportTypeController.createTransportType);


module.exports = router;