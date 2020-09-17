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

exports.createEvidence = (req, res) => {
    const evidence = new Evidence(req.body);
    evidence.save((err, evidence) => {
        if(err){
            return res.status(400).json({
                error: "Unable to save in evidence"
            })
        }
        res.json(evidence);
    });
}

exports.getAllEvidences = (req, res) => {
   Evidence.find()
   .exec((err, evidences) => {
       if(err) {
           res.status(400).json({
              error: "Unable to retrieve evidences"
          })
      }
        res.json(evidences)

   });
};

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
