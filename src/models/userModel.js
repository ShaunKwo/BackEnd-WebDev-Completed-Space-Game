//Author: Shaun Kwo Rui Yu
//Adm No.: 2317933
// Class: DAAA/FT/1B06


const pool = require('../services/db');

module.exports.insertUser = (data, callback) => {
    const SQLSTATEMENT = `INSERT INTO User (username, email, password) VALUES (?, ?, ?)`;
    const VALUES = [data.username, data.email, data.password];
  
    pool.query(SQLSTATEMENT, VALUES, callback);
  };

module.exports.selectUserByUsername = (data, callback) => {
    const SQLSTATEMENT = `SELECT * FROM User WHERE username = ?`;
    const VALUES = [data.username];
  
    pool.query(SQLSTATEMENT, VALUES, callback);
  }

// CREATE (POST) /User
module.exports.createNewUser = (data, callback) => {
    const SQL_STATEMENT = `
        INSERT INTO User (username, email, password)
        VALUES (?, ?)
    `;
    const VALUES = [data.username, data.email, data.password];

    pool.query(SQL_STATEMENT, VALUES, callback);
};



// READ ALL (GET) /User
module.exports.getAllUsers = (callback) => {
    const SQL_STATEMENT = `
        SELECT * FROM User
    `;

    pool.query(SQL_STATEMENT, callback);
};



// READ BY ID (GET) /User/:id
module.exports.getUserById = (data, callback) => {
    const SQL_STATEMENT = `
    SELECT user_id, username, email, appearance_name FROM user 
    INNER JOIN appearances ON user.appearance_id = appearances.appearance_id WHERE user_id = ?; 


    SELECT sum(points) as points FROM taskprogress 
    INNER JOIN task ON taskprogress.task_id = task.task_id WHERE taskprogress.user_id = ?;

    SELECT COUNT(*) AS planet_count FROM Colonies WHERE user_id = ?;
    `
    const VALUES = [data.id, data.id,  data.id];

    pool.query(SQL_STATEMENT, VALUES, callback);
};



// UPDATE BY ID (PUT) /User/:id
module.exports.updateUserById = (data, callback) => {
    const SQL_STATEMENT = `
        UPDATE User
        SET username = ?, email = ?
        WHERE user_id = ?;
    `;
    const VALUES = [data.username, data.email, data.user_id];

    pool.query(SQL_STATEMENT, VALUES, callback);
};



// DELETE BY ID (DELETE) /User/:id
module.exports.deleteUserById = (data, callback) => {
    const SQL_STATEMENT = `
        DELETE FROM User 
        WHERE user_id = ?;
        ALTER TABLE User AUTO_INCREMENT = 1;
    `;
    const VALUES = [data.user_id];

    pool.query(SQL_STATEMENT, VALUES, callback);
};


//CHECK if provided email is already associated with another user
module.exports.checkEmail = (data, callback) => {
    const SQL_STATEMENT = `
        SELECT * FROM User 
        WHERE email = ?
    `;
    const VALUES = [data.email];

    pool.query(SQL_STATEMENT, VALUES, callback);
};

//CHECK if provided username or email is already associated with another user
module.exports.checkUserNameOrEmail = (data, callback) => {
    const SQL_STATEMENT = `
        SELECT * FROM User 
        WHERE username = ? OR email=?;
    `;
    const VALUES = [data.username, data.email];

    pool.query(SQL_STATEMENT, VALUES, callback);
};

module.exports.checkPts =(data, callback)=>{
    const SQL_STATEMENT =`
    SELECT sum(points) as points FROM taskprogress 
    INNER JOIN task ON taskprogress.task_id = task.task_id 
    WHERE taskprogress.user_id = ?;

    SELECT cost FROM appearances WHERE appearance_id =?`;

    const VALUES =[data.user_id, data.appearance_id];

    pool.query(SQL_STATEMENT, VALUES, callback);
};

module.exports.buyAppearance = (data, callback) => {
    const SQL_STATEMENT = `

        INSERT INTO TaskProgress (user_id, task_id)
        VALUES (?, ?);

        UPDATE User
        SET appearance_id=? WHERE user_id=?

    `;
    
    const VALUES = [data.user_id,  data.task_id, data.appearance_id, data.user_id];

    pool.query(SQL_STATEMENT, VALUES, callback);
};

