//Author: Shaun Kwo Rui Yu
//Adm No.: 2317933
// Class: DAAA/FT/1B06


const express = require('express');
const router = express.Router();

const controller = require('../controllers/taskController');

router.get('/', controller.readAllTasks);
router.post('/', controller.createNewTask);
router.get('/:id', controller.readTaskById);
router.put('/:id', controller.updateTaskById);
router.delete('/:id', controller.deleteTaskById);

module.exports = router;