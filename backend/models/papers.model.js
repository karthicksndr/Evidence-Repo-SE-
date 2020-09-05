/*
1. title
2. submitter
3. author
4. bibliogrphic details
5. ratings
6. reviews
7. approved/ not
8. tags
9. keywords
10. date of submission
11. type of paper
12. abstract
*/

const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const paperSchema= new Schema ({
    title :{
        type: String, 
        maxlength: 200,
        required: true
    }, 
    submitter : {
        type: String, 
        required: true
    },
    author : {
        type: String, 
        required: true
    }, 
    bibliographicDetails : {
        type: String, 
        required: true
    },
    rating : {
        type: Number
    },
    review : {
        type: Array
    },
    status : {
        type: Boolean,
        required: true
    },
    tags : {
        type: String
    },
    keywords : {
        type: String
    },
    dateOfSubmission : {
        type: Date,
        required: true
    },
    typeOfPaper: {
        type: String
    },
    abstract : {
        type: String, 
        required: true
    }
});

module.exports = mongoose.model('Paper', paperSchema)