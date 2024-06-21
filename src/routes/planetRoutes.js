//Author: Shaun Kwo Rui Yu
//Adm No.: 2317933
// Class: DAAA/FT/1B06

const express = require('express');
const router = express.Router();

const controller = require('../controllers/planetController');

router.get('/', controller.readAllPlanets);
router.post('/', controller.createNewPlanet);
router.get('/:id', controller.readPlanetById);
router.put('/:id', controller.updatePlanetById);
router.delete('/:id', controller.deletePlanetById);

module.exports = router;