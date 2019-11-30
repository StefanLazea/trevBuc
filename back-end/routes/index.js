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

router.post('/register', userController.createUsers);
router.post('/login', (req, res) => {
    res.status(200).send({ message: `${req.body.password}` });
});
router.post('/reviews', (req, res) => {
    const leavingPoint = req.body.leaving_point;
    // if(leaving_point === "")
    Review.create({
        leaving_point: req.body.leaving_point
    })
    res.send(`Am primit ${req.body.leaving_point}`);

})
router.post('/logout', loginRequired, (req, res) => {
    res.status(200).send({ message: "todo" });
});
module.exports = router;