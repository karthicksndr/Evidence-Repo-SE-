const { Router } = require("express");
const {signUp, signIn, signOut} = require("../controllers/auth")

var express = require('express')
var router = express.Router()

router.post("/signup", signUp)

router.post("/signin", signIn)

 router.get("/signout", signOut)

module.exports = router;