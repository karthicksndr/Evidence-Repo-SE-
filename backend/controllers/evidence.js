const { Label } = require('reactstrap');
const Evidence = require('../models/evidence')
require("dotenv").config();
const aws = require('aws-sdk');


const getEvidenceById = (req,res) => {
    Evidence.findById(req.params.id)
    .then(evidence => res.json(evidence))
    .catch(err => res.status(404).json({ nobookfound: 'No Book found' }));
};

const getEvidence = (req, res) => {
    return res.json(req.evidence)
};

const searchEvidence = (req, res) => {
    const filter= new RegExp(["^", req.query.search, "$"].join(""), "i")
    const filter1 =  req.query.search1
    const claim = filter1.split(',')
       
    const claimLength = claim.length;
    const sortBy= req.query.sort
    // console.log(sortBy)
    const value= req.query.value
    
        if(sortBy == null){
        if (filter1 == 0) 
        {    
            Evidence.find({seMethod: filter}).exec((err,seMethod ) => {
                if( err || !seMethod)
                {
                    return err=> res.status(400).json(err)
                }
                res.json(seMethod)  
            })
        }
        else 
        {
            const query = {$and : [ {seMethod: filter}, {claims: claim}]}
        
            Evidence.find(query).exec((err,seMethod ) => {
                if( err || !seMethod)
                {
                    return err=> res.status(400).json(err)
                }
                res.json(seMethod)  
            })
        }
    }
    else { 
        if (filter1 == 0) 
        {    
            Evidence.find({seMethod: filter}).sort({[sortBy] : value}).exec((err,seMethod ) => {
                if( err || !seMethod)
                {
                    return err=> res.status(400).json(err)
                }
                res.json(seMethod)  
            })
        }
        else 
        {
            const query = {$and : [ {seMethod: filter}, {claims: claim}]}
        
            Evidence.find(query).sort({[sortBy] : value}).exec((err,seMethod ) => {
                if( err || !seMethod)
                {
                    return err=> res.status(400).json(err)
                }
                res.json(seMethod)  
            })
        }
    }
}

const getAllEvidences = (req, res) => {
    Evidence.find({status: "Accepted"})
    .then( evidence=> res.json(evidence))
    .catch(err=> res.status(400).json(err))
};

const getAnalaysEvidence = (req, res) => {
    Evidence.find({status: "Approved"})
    .then( evidence=> res.json(evidence))
    .catch(err=> res.status(400).json(err))
};

const createEvidence = (req, res) => {
    const file = req.file;
    const s3FileURL = process.env.AWS_Uploaded_File_URL_LINK;

    let s3bucket = new aws.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION
    });

    //Where you want to store your file

    var params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: file.originalname,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: "public-read"
    };

    s3bucket.upload(params, function (err, data) {
        if (err) {
            res.status(500).json({ error: true, Message: err });
        } else {
            res.send({ data });
            var newEvidenceUploaded = {
                typeOfPaper: req.body.typeOfPaper,
                title: req.body.title,
                author: req.body.author,
                source: req.body.source,
                yearOfPublication: req.body.yearOfPublication,
                doiLink: req.body.doiLink,
                status: req.body.status,
                dateOfSubmission: req.body.dateOfSubmission,
                bibfile: s3FileURL + file.originalname,
                s3_key: params.Key
            };
            var evidence = new Evidence(newEvidenceUploaded);
            evidence.save(function (err, evidence) {
                if (err) {
                    try {
                        console.log(evidence)
                        return res.status(400).json({
                            error: "Unable to save evidence"
                        })
                    } catch (error) {
                        console.log(error)
                    }

                }
                     res.send(evidence);
            });
        }
    })
}

const getPendEvidences = (req, res) => {
    Evidence.find({status: "Pending Review"})
    .then( evidence=> res.json(evidence))
    .catch(err => res.status(404).json({ message: 'No Evidence found' }));
};

const updateEvidence = (req, res) => {
    Evidence.findByIdAndUpdate(
        {_id : req.evidence._id},
        {$set: req.body},
        {new: true , useFindAndModify: false},
        (err, evidence) => {
            if(err || !evidence){
                res.status(400).json({
                    error: "You're not authorised to update this info"
                })
            }
            evidence.createdAt = undefined;
            evidence.updatedAt= undefined;
            res.json(evidence)
        });
}

const removeEvidence = (req, res) => {
    const evidence = req.evidence;

    evidence.remove((err, evidence) => {
        if(err){
            return res.status(400).json({
                error: "Unable to delete evidence"
            })
        }
        res.json({
            msg: 'Updated successfully'
        });
    });
};

module.exports.getEvidenceById = getEvidenceById
module.exports.getEvidence = getEvidence
module.exports.searchEvidence = searchEvidence
module.exports.getAllEvidences = getAllEvidences
module.exports.getPendEvidences = getPendEvidences
module.exports.createEvidence = createEvidence
module.exports.updateEvidence = updateEvidence
module.exports.removeEvidence = removeEvidence
module.exports.getAnalaysEvidence = getAnalaysEvidence
