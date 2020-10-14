const express = require("express")
const router = express.Router();
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage
}).single('bibfile');

const Evidence = require('../models/evidence')
// const routes = require('../controllers/evidence')
 
const { getEvidenceById, 
    getEvidence, 
    createEvidence ,
    updateEvidence, 
    removeEvidence,
    getAllEvidences,
    getPendEvidences,
    searchEvidence,

     } = require('../controllers/evidence')
// const {isSignedIn,isAdmin,isAuthenticated} = require('../controllers/auth')
const {getUserById} = require('../controllers/user')

router.param("evidenceId" ,getEvidenceById);
router.param("userId" ,getUserById);
// // router.param("seMethod", filterEvidence)
// // router.param("year", filterBasedOnYear)

// router.get("/:evidenceId", isSignedIn, getEvidence);

router.get("/:evidenceId", getEvidence);

router.get("/", searchEvidence)

// // router.get("/search/:seMethod/:year", displayWithYear)

// router.post('/add', isSignedIn, createEvidence);

 router.post('/add', createEvidence);

// router.put("/:evidenceId/:userId", isSignedIn, isAuthenticated, isAdmin, updateEvidence)

router.post('/add', upload, createEvidence);

router.put("/:evidenceId/:userId", updateEvidence)

// router.delete("/:evidenceId/:userId", isSignedIn, isAuthenticated, isAdmin, removeEvidence)

router.delete("/:evidenceId", removeEvidence)

router.get("/evidences/all", getAllEvidences)

router.get("/evidences/pending", getPendEvidences)

router.get('/update/:id', (req, res) => {
  Evidence.findById(req.params.id)
    .then(evidence => res.json(evidence))
    .catch(err => res.status(404).json({ noevidencefound: 'No Evidence found' }));
});

router.put('/:id', (req, res) => {
    Evidence.findByIdAndUpdate(req.params.id, req.body)
      .then(evidence => res.json({ msg: 'Updated successfully' }))
      .catch(err =>
        res.status(400).json({ error: 'Unable to update the Database' })
      );
  });

  router.delete('/:id', (req, res) => {
    Evidence.findByIdAndRemove(req.params.id, req.body)
      .then(evidence => res.json({ mgs: 'Book entry deleted successfully' }))
      .catch(err => res.status(404).json({ error: 'No such a book' }));
  });

module.exports= router;
