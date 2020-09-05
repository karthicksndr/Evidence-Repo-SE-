const router= require('express').Router();
let user= require('../models/user')

router.route('/').get((req,res) => {
    user.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json({
        error: "Cannot get user list"
    }));
});

router.route('/add').post((req, res)=> {
    const userDetails = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        email: req.body.email,
        userType: req.body.userType
    }
    const newUser = new user(userDetails)
    newUser.save()
    .then(()=> res.json(newUser))
    .catch(err => res.status(400).json('Error: '+err))

})

module.exports = router;