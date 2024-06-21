//Author: Shaun Kwo Rui Yu
//Adm No.: 2317933
// Class: DAAA/FT/1B06


const pool = require('../services/db');

// CREATE (POST) /Task
module.exports.createNewTaskProgress = (data, callback) => {
    const SQL_STATEMENT = `
        INSERT INTO TaskProgress (user_id, task_id, notes)
        VALUES (?, ?, ?);

        SELECT * FROM TaskProgress
        ORDER BY TaskProgress.progress_id
        DESC
        LIMIT 1;
    `;
    const VALUES = [data.user_id, data.task_id, data.notes];

    pool.query(SQL_STATEMENT, VALUES, callback);
};



// READ BY ID (GET) /Task/:id
module.exports.getProgressById = (data, callback) => {
    const SQL_STATEMENT = `
        SELECT * FROM taskProgress
        WHERE progress_id=?
    `;
    const VALUES = [data.progress_id];

    pool.query(SQL_STATEMENT, VALUES, callback);
};


// READ BY USER ID (GET) /TaskProgress/users/:user_id
module.exports.getProgressByUserId = (data, callback) => {
    const SQL_STATEMENT = `
        SELECT TaskProgress.*, Task.title AS task_name
        FROM TaskProgress
        INNER JOIN Task ON TaskProgress.task_id = Task.task_id
        WHERE TaskProgress.user_id=?
    `;
    const VALUES = [data.user_id];

    pool.query(SQL_STATEMENT, VALUES, callback);
};



// UPDATE BY ID (PUT) /Task/:id
module.exports.updateProgressById = (data, callback) => {
    const SQL_STATEMENT = `
        UPDATE TaskProgress
        SET notes = ? WHERE progress_id = ?;
        
        SELECT * FROM taskProgress
        WHERE progress_id = ?;
        `;

    const VALUES = [data.notes, data.id, data.id];

    pool.query(SQL_STATEMENT, VALUES, callback);
};



// DELETE BY ID (DELETE) /Task/:id
module.exports.deleteProgressById = (data, callback) => {
    const SQL_STATEMENT = `
        DELETE FROM TaskProgress
        WHERE progress_id = ?
    `;
    const VALUES = [data.progress_id];

    pool.query(SQL_STATEMENT, VALUES, callback);
};

