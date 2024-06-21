//Author: Shaun Kwo Rui Yu
//Adm No.: 2317933
// Class: DAAA/FT/1B06


const express = require('express');
const router = express.Router();

const controller = require('../controllers/taskProgressController');

router.post('/:task_id/users/:user_id', controller.createTaskProgress);
router.get('/:id', controller.readTaskProgressById);
router.put('/:id', controller.updateTaskProgressById);
router.delete('/:id', controller.deleteTaskProgressById);
router.get('/users/:user_id', controller.getTaskProgressByUserId);
module.exports = router;