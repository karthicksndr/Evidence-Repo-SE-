const express = require("express")
const router = express.Router();

const { getEvidenceById, getEvidence, createEvidence, updateEvidence, removeEvidence, getAllEvidences} = require('../controllers/evidence')
const {isSignedIn,isAdmin,isAuthenticated} = require('../controllers/auth')
const {getUserById} = require('../controllers/user')

router.param("evidenceId" ,getEvidenceById);
router.param("userId" ,getUserById);

router.get("/:evidenceId", isSignedIn, getEvidence);

router.post('/add', createEvidence);

router.get('/evidences/all', getAllEvidences)

router.put("/:evidenceId/:userId", isSignedIn, isAuthenticated, isAdmin, updateEvidence)

router.delete("/:evidenceId/:userId", isSignedIn, isAuthenticated, isAdmin, removeEvidence)

module.exports= router;
