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
//route for transport types 
router.get('/transport-type', transportTypeController.getAllTransportTypes);
//route for reviews
router.get('/reviews', reviewsController.getAllReviews);
//todo
router.post('/reviews', verifyAuth, (req, res) => {
    const leavingPoint = req.body.leaving_point;
    Review.create({
        leaving_point: req.body.leaving_point
    })
    return res.send(`Am primit ${req.body.leaving_point}`);

})

module.exports = router;