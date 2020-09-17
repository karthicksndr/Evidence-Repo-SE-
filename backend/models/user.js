/*
1. Firstname
2. Last name
3. password
4. email
5. user type
6. search history: 
7. createdAt
*/

const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true, 
        maxlength: 32,
        trim: true
    }, 
    lastName: {
        type: String, 
        required: true, 
        maxlength: 32,
        trim: true
    },
    password: {
        type: String,
        required: true, 
        minlength: 5,
        trim: true
    }, 
    email : {
        type: String,
        required: true, 
        unique: true, 
        trim: true
    },
    userType : {
        type: String,
   //   required: true
    },
    searchHistory : {
        type: Array,
    }
 },
    {
        timestamps : true
    }
);

module.exports = mongoose.model('User', userSchema)