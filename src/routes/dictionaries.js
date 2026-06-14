const express = require('express');
const router = express.Router();
const dictController = require('../controllers/dictionaryController');
const { protect } = require('../middleware/auth');

// Protect all dictionary routes
router.use(protect);

router.get('/teams', dictController.getTeams);
router.post('/teams', dictController.createTeam);
router.delete('/teams/:id', dictController.deleteTeam);

router.get('/departments', dictController.getDepartments);
router.post('/departments', dictController.createDepartment);
router.delete('/departments/:id', dictController.deleteDepartment);

router.get('/areas', dictController.getAreas);
router.post('/areas', dictController.createArea);
router.delete('/areas/:id', dictController.deleteArea);

router.get('/systems', dictController.getSystems);
router.post('/systems', dictController.createSystem);
router.delete('/systems/:id', dictController.deleteSystem);

module.exports = router;
