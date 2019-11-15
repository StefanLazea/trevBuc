const router = require("express").Router();
const userController = require('../controllers/users');

const loginRequired = (req, res, next)=>{
    if(!req.headers.authorization){
        return res.status(403).send({message:"Not authorized"});
    }else{
        req.token = req.headers.authorization.split(" ")[1];
        next();
    }
}

router.post('/register', userController.createUsers);
router.post('/login', (req, res)=>{
    res.status(200).send({message:"ura"});
});
router.post('/logout', loginRequired, (req, res)=>{
    res.status(200).send({message:"todo"});
});
module.exports = router;