const { Label } = require('reactstrap');
const Evidence = require('../models/evidence')

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

const getAllEvidences = (req, res) => {
    Evidence.find({status: "Accepted"})
    .then( evidence=> res.json(evidence))
    .catch(err=> res.status(400).json(err))
};

const getPendEvidences = (req, res) => {
    Evidence.find({status: "Pending Review"})
    .then( evidence=> res.json(evidence))
    .catch(err => res.status(404).json({ message: 'No Evidence found' }));
};

const createEvidence = (req, res) => {
    const evidence = new Evidence(req.body);
    evidence.save((err, exercise) => {
        if(err){
            return res.status(400).json({
                error: "Unable to save in category"
            })
        }
        res.json(evidence);
    });
}

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
