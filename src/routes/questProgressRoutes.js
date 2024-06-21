//Author: Shaun Kwo Rui Yu
//Adm No.: 2317933
// Class: DAAA/FT/1B06

const express = require('express');
const router = express.Router();

const controller = require('../controllers/questProgressController');

router.post('/:quest_id/users/:user_id', controller.checkUserAppearance, controller.checkIfQuestCompletedBefore, controller.getItemPlanetId, controller.createQuestProgress);
router.get('/:id', controller.readQuestProgressById);
router.put('/:id', controller.updateQuestProgressById);
router.delete('/:id', controller.deleteQuestProgressById);
router.get('/users/:user_id', controller.getQuestProgressByUserId);
router.get('/userAbilities/:user_id', controller.getUserPlanetsAbilities);


module.exports = router;