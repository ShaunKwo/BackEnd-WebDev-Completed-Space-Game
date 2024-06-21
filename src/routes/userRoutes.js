//Author: Shaun Kwo Rui Yu
//Adm No.: 2317933
// Class: DAAA/FT/1B06


const express = require('express');
const router = express.Router();

const controller = require('../controllers/userController');

router.get('/', controller.readAllUsers);
router.post('/', controller.checkEmail, controller.createNewUser);
router.get('/:id', controller.readUserById);
router.put('/:id', controller.checkUsernameOrEmail, controller.updateUserById);
router.delete('/:id', controller.deleteUserById);

router.put('/:user_id/claim_appearance/:appearance_id', controller.checkPoints, controller.buyAppearance);

module.exports = router;
