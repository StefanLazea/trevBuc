const router = require("express").Router();
const userController = require('./controllers/users');

router.post('/register', userController.createUsers);
router.get('/friend', (req,res)=>{
    res.status(200).send({message:"ok boss"})
})
module.exports = router;