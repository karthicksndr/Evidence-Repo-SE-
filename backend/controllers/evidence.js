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


exports.filterEvidence = (req, res,next, seMethod) => {

    const regex = new RegExp(["^", seMethod, "$"].join(""), "i")

  Evidence.find({seMethod : regex }).exec((err,seMethod ) => {
        if( err || !seMethod)
        {
            return err=> res.status(400).json(err)
        }
        req.seMethod = seMethod;
        next();
    })
}

exports.displayOnlySearch= (req, res) => {
    return(res.json(req.seMethod))
}

exports.filterBasedOnYear = (req, res, next, year) => {

    const filterC = { $and: [ { yearOfPublication: { $in: [year[0],year[1]] } }, { seMethod: ["TDD"] } ] }
    Evidence.find(filterC).exec((err, result ) => {
        if( err || !result)
        {
            return err=> res.status(400).json(err)
        }
        req.result = result;
        next();
    })
    
}

exports.displayWithYear = (req, res) => {
    res.json(req.param.seMethod)
    res.json(req.param.year)
}

exports.getAllEvidences = (req, res) => {
    Evidence.find({status: "Accepted"})
    .then( evidence=> res.json(evidence))
    .catch(err=> res.status(400).json(err))
};

exports.createEvidence = (req, res) => {
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