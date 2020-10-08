const { Label } = require('reactstrap');
const Evidence = require('../models/evidence')

exports.getEvidenceById = (req,res,next,id) => {
    Evidence.findById(id).exec((err, evidence) => {
        if(err || !evidence){
            return res.status(400).json({
                error: "No user found in DB"
            })
        }
        req.evidence= evidence;
        next();
    });
}

exports.getEvidence = (req, res) => {
    return res.json(req.evidence)
};

exports.searchEvidence = (req, res) => {
    const filter= new RegExp(["^", req.query.search, "$"].join(""), "i")
    const filter1 =  req.query.search1
    const claim = filter1.split(',')
    console.log(claim)
    const claimLength = claim.length;
    const sortBy= req.query.sort
    const value= req.query.value
    
        if(sortBy == null){
        if (claimLength == 0) 
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
    else if(sortBy == "author"){ 
        if (claimLength == 0) 
        {    
            Evidence.find({seMethod: filter}).sort({author : value}).exec((err,seMethod ) => {
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
        
            Evidence.find(query).sort({author : value}).exec((err,seMethod ) => {
                if( err || !seMethod)
                {
                    return err=> res.status(400).json(err)
                }
                res.json(seMethod)  
            })
        }
    }
    else if(sortBy == "title"){ 
        if (claimLength == 0) 
        {    
            Evidence.find({seMethod: filter}).sort({title : value}).exec((err,seMethod ) => {
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
        
            Evidence.find(query).sort({title : value}).exec((err,seMethod ) => {
                if( err || !seMethod)
                {
                    return err=> res.status(400).json(err)
                }
                res.json(seMethod)  
            })
        }
    }
    else if(sortBy == "yearOfPublication"){ 
        if (claimLength == 0) 
        {    
            Evidence.find({seMethod: filter}).sort({yearOfPublication : value}).exec((err,seMethod ) => {
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
        
            Evidence.find(query).sort({yearOfPublication : value}).exec((err,seMethod ) => {
                if( err || !seMethod)
                {
                    return err=> res.status(400).json(err)
                }
                res.json(seMethod)  
            })
        }
    }
}

exports.getAllEvidences = (req, res) => {
    Evidence.find({status: "Accepted"})
    .then( evidence=> res.json(evidence))
    .catch(err=> res.status(400).json(err))
};

exports.createEvidence = (req, res) => {

    const evidence = new Evidence();
    evidence.typeOfPaper = req.body.typeOfPaper;
    evidence.title = req.body.title;
    evidence.author = req.body.author;
    evidence.source = req.body.source;
    evidence.yearOfPublication = req.body.yearOfPublication;
    evidence.doiLink = req.body.doiLink;
    evidence.status = req.body.status;
    evidence.dateOfSubmission = req.body.dateOfSubmission;
    evidence.bibfile = req.file;

    evidence.save((err, evidence) => {
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


exports.updateEvidence = (req, res) => {
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

exports.removeEvidence = (req, res) => {
    const evidence = req.evidence;

    evidence.remove((err, evidence) => {
        if(err){
            return res.status(400).json({
                error: "Unable to delete evidence"
            })
        }
        res.json({
            message: `Successfully deleted evidence - ${evidence.title}`
        });
    });
};