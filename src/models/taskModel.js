//Author: Shaun Kwo Rui Yu
//Adm No.: 2317933
// Class: DAAA/FT/1B06

const pool = require('../services/db');

// CREATE (POST) /Task
module.exports.createNewTask = (data, callback) => {
    const SQL_STATEMENT = `
        INSERT INTO Task (title, description, points)
        VALUES (?, ?, ?)
    `;
    const VALUES = [data.title, data.description, data.points];

    pool.query(SQL_STATEMENT, VALUES, callback);
};



// READ ALL (GET) /Task
module.exports.getAllTasks = (callback) => {
    const SQL_STATEMENT = `
        SELECT * FROM Task
    `;

    pool.query(SQL_STATEMENT, callback);
};



// READ BY ID (GET) /Task/:id
module.exports.getTaskById = (data, callback) => {
    const SQL_STATEMENT = `
        SELECT * FROM Task 
        WHERE task_id = ?
    `;
    const VALUES = [data.task_id];

    pool.query(SQL_STATEMENT, VALUES, callback);
};



// UPDATE BY ID (PUT) /Task/:id
module.exports.updateTaskById = (data, callback) => {
    const SQL_STATEMENT = `
        UPDATE Task
        SET title = ?, description = ?, points= ?  WHERE task_id = ?
    `;
    const VALUES = [data.title, data.description, data.points, data.task_id];

    pool.query(SQL_STATEMENT, VALUES, callback);
};



// DELETE BY ID (DELETE) /Task/:id
module.exports.deleteTaskById = (data, callback) => {
    const SQL_STATEMENT = `
        DELETE FROM Task
        WHERE task_id = ?
    `;
    const VALUES = [data.task_id];

    pool.query(SQL_STATEMENT, VALUES, callback);
};
