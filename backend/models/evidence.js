/*
1. title
2. submitter
3. author
4. bibliogrphic_details
5. ratings
6. reviews
7. approved/ not
8. tags
9. keywords
10. date of submission
11. type of paper
12. abstract
13. DOI Link
*/

const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema;

const Schema = mongoose.Schema;

const paperSchema= new Schema ({
    typeOfPaper: {
        type: String,
        required: true
    },
    title :{
        type: String, 
        maxlength: 200,
        required: true
    }, 
    author : {
        type: String, 
        required: true
    }, 
    source : {
        type: String, 
        required: true
    },
    yearOfPublication: {
        type:Number, 
        required: true
    },
    doiLink : {
        type: String, 
        required: true
    },
    seMethod : {
        type: String
    },
    outcome: {
        type: String,
    },
    status : {
        type: String,
        required: true
    },
    rating : {
        type: Number
    },
    reviews: {
        type: Object
    },
    dateOfSubmission : {
        type: Date,
        required: true
    },
    submitter: {
        type: ObjectId,
        ref: "User",
    }
},
    { timestamps: true  }
);

module.exports = mongoose.model('Paper', paperSchema)