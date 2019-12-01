const router = require("express").Router();
const userController = require('../controllers/users');
const tokenController = require('../controllers/token');
const Review = require("../models").Reviews;

//register an user
router.post('/register', userController.registerUser);
//route for login an user with credentials
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/refreshToken', tokenController.refreshToken);

//todo
router.post('/reviews', (req, res) => {
    const leavingPoint = req.body.leaving_point;
    // if(leaving_point === "")
    Review.create({
        leaving_point: req.body.leaving_point
    })
    res.send(`Am primit ${req.body.leaving_point}`);

})

module.exports = router;