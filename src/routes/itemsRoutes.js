//Author: Shaun Kwo Rui Yu
//Adm No.: 2317933
// Class: DAAA/FT/1B06

const express = require('express');
const router = express.Router();

const controller = require('../controllers/itemsController');

router.get('/', controller.readAllItems);
router.post('/', controller.createNewItem);
router.get('/:id', controller.readItemById);
router.put('/:id', controller.updateItemById);
router.delete('/:id', controller.deleteItemById);

module.exports = router;