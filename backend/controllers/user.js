const User = require('../models/user');

const getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'No user found in DB',
      });
    }
    req.profile= user;
    next();
  });
};

const getUser = (req, res) => {
  req.profile.password = undefined;
  req.profile.createdAt = undefined;
  req.profile.updatedAt= undefined;
  return res.json(req.profile);
};

const getAllUsers = (req, res) => {
  User.find()
      .then( (user) => res.json(user))
      .catch((err)=> res.status(400).json('Error: '+ err));
};

const updateUser = (req, res) => {
  User.findByIdAndUpdate(
      {_id: req.profile._id},
      {$set: req.body},
      {new: true, useFindAndModify: false},
      (err, user) => {
        if (err || !user) {
          res.status(400).json({
            error: 'You\'re not authorised to update this info',
          });
        }
        user.createdAt = undefined;
        user.updatedAt= undefined;
        res.json(user);
      });
};

module.exports.getUserById = getUserById;
module.exports.getUser = getUser;
module.exports.getAllUsers = getAllUsers;
module.exports.updateUser = updateUser;

