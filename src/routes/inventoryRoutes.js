//Author: Shaun Kwo Rui Yu
//Adm No.: 2317933
// Class: DAAA/FT/1B06

const express = require('express');
const router = express.Router();

const controller = require('../controllers/inventoryController');

router.get('/users/:user_id', controller.getUserInventory);

module.exports = router;