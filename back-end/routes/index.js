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
//route for transport types 
router.get('/gatt', transportTypeController.getAllTransportTypes);
//route by mihnea for reviews
router.get('/reviews',verifyAuth, reviewsController.getAllReviews);

//update a review
router.put('/reviews/:id', verifyAuth, reviewsController.updateReview);


//todo
// am modificat putin post-ul lui stefan
router.post('/reviews', verifyAuth, (req, res) => {
    const leavingPoint = req.body.leaving_point;
   Review.create({
        leaving_point: req.body.leaving_point,
        arriving_point: req.body.arriving_point,
        leaving_hour: req.body.leaving_hour,
        duration: req.body.duration,
        observations: req.body.observations,
        rating: req.body.rating,
        congestion_level: req.body.congestion_level
        
    })
    return res.send(`Am primit ${req.body.leaving_point}`);

})

module.exports = router;