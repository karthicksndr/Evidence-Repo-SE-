const express = require("express")
const router = express.Router();

const { getEvidenceById, 
    getEvidence, 
    createEvidence ,
    updateEvidence, 
    removeEvidence,
    getAllEvidences,
    searchEvidence,

     } = require('../controllers/evidence')
const {isSignedIn,isAdmin,isAuthenticated} = require('../controllers/auth')
const {getUserById} = require('../controllers/user')

router.param("evidenceId" ,getEvidenceById);
router.param("userId" ,getUserById);
// router.param("seMethod", filterEvidence)
// router.param("year", filterBasedOnYear)

router.get("/:evidenceId", isSignedIn, getEvidence);

router.get("/", searchEvidence)

// router.get("/search/:seMethod/:year", displayWithYear)

router.post('/add', isSignedIn, createEvidence);

router.put("/:evidenceId/:userId", isSignedIn, isAuthenticated, isAdmin, updateEvidence)

router.delete("/:evidenceId/:userId", isSignedIn, isAuthenticated, isAdmin, removeEvidence)

router.get("/evidences/all", getAllEvidences)

module.exports= router;
