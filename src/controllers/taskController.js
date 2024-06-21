//Author: Shaun Kwo Rui Yu
//Adm No.: 2317933
// Class: DAAA/FT/1B06


const model = require("../models/taskModel.js");


// ENDPOINT: CREATE Task
module.exports.createNewTask = (req, res, next) => {
    if (req.body.title == undefined ||req.body.description == undefined ) {
        res.status(400).send("Error: title or description is undefined");
        return;
    }

    const data = {
        title: req.body.title,
        description: req.body.description,
        points: req.body.points
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewTask:", error);
            res.status(500).json(error);
        } else {
            res.status(201).json({
                task_id: results.insertId,
                title: req.body.title,
                description: req.body.description,
                points: req.body.points}
            );
        }
    };

    model.createNewTask(data, callback);
};

// ENDPOINT: READ ALL Tasks
module.exports.readAllTasks = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error getTasks:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    };

    model.getAllTasks(callback);
};

// ENDPOINT: READ Task BY ID
module.exports.readTaskById = (req, res, next) => {
    const data = {
        task_id: req.params.id
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error getTask:", error);
            res.status(500).json(error);
        } else {
            if (results.length === 0) {
                res.status(404).json({
                    error: "Task not found"
                });
            } else {
                res.status(200).json(results[0]);
            }
        }
    };

    model.getTaskById(data, callback);
};

// ENDPOINT: UPDATE Task BY ID
module.exports.updateTaskById = (req, res, next) => {
    const data = {
        task_id: req.params.id,
        title: req.body.title,
        description: req.body.description,
        points: req.body.points
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateTask:", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows === 0) {
                res.status(404).json({
                    error: "Task not found"
                });
            } else {
                res.status(200).json(data);
            }
        }
    };

    model.updateTaskById(data, callback);
};

// ENDPOINT: DELETE Task BY ID
module.exports.deleteTaskById = (req, res, next) => {
    const data = {
        task_id: req.params.id
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteTask:", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows === 0) {
                res.status(404).json({
                    error: "The requested task_id does not exist"
                });
            } else {
                res.status(204).send();
            }
        }
    };

    model.deleteTaskById(data, callback);
};
