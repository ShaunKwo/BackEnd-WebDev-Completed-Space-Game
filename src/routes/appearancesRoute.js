//Author: Shaun Kwo Rui Yu
//Adm No.: 2317933
// Class: DAAA/FT/1B06


const express = require('express');
const router = express.Router();

const controller = require('../controllers/appearancesController');

router.get('/', controller.readAllAppearances);
router.post('/', controller.createAppearance);
router.get('/:id', controller.readAppearanceById);
router.put('/:id', controller.updateAppearanceById);
router.delete('/:id', controller.deleteAppearanceById);

module.exports = router;
