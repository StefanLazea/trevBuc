const router = require("express").Router();
const userController = require('../controllers/users');
const Review = require("../models").Reviews;

const loginRequired = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).send({ message: "Not authorized" });
    } else {
        req.token = req.headers.authorization.split(" ")[1];
        next();
    }
}

router.post('/register', userController.registerUser);
router.post('/login', userController.login);
router.post('/logout', userController.logout);

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