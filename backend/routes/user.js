const express = require('express');
const router = express.Router();

const {getUserById, getUser, updateUser, getAllUsers} = require('../controllers/user');
const {isSignedIn, isAdmin, isAuthenticated} = require('../controllers/auth');

router.param('userId', getUserById);

// router.get("/:userId", isSignedIn, isAuthenticated, getUser);

router.get('/users/all', getAllUsers);

// router.put("/:userId", isSignedIn, isAdmin, isAuthenticated, updateUser)

module.exports= router;
