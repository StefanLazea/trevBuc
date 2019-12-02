const router = require("express").Router();
const userController = require('../controllers/users');
const verifyAuth = require('../controllers/middlewares').verifyToken;
const Review = require("../models").Reviews;

router.post('/register', userController.registerUser);
//route for login an user with credentials
router.post('/login', userController.login);
router.post('/logout', userController.logout);

//todo
router.post('/reviews', verifyAuth, (req, res) => {
    const leavingPoint = req.body.leaving_point;
    Review.create({
        leaving_point: req.body.leaving_point
    })
    return res.send(`Am primit ${req.body.leaving_point}`);

})

module.exports = router;