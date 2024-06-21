//Author: Shaun Kwo Rui Yu
//Adm No.: 2317933
// Class: DAAA/FT/1B06


const pool = require('../services/db');

// CREATE (POST) /Colony
module.exports.createNewColony = (data, callback) => {
    const SQL_STATEMENT = `
        INSERT INTO Colonies (user_id, planet_id, colony_level)
        VALUES (?,  ?, ?)
    `;
    const VALUES = [data.user_id, data.planet_id, data.colony_level];

    pool.query(SQL_STATEMENT, VALUES, callback);
};

// READ ALL (GET) /Colony
module.exports.getAllColonies = (callback) => {
    const SQL_STATEMENT = `
        SELECT * FROM Colonies
    `;

    pool.query(SQL_STATEMENT, callback);
};

// READ BY ID (GET) /Colony/:id
module.exports.getColonyById = (data, callback) => {
    const SQL_STATEMENT = `
        SELECT * FROM Colonies
        WHERE colony_id = ?
    `;
    const VALUES = [data.colony_id];

    pool.query(SQL_STATEMENT, VALUES, callback);
};

// UPDATE BY ID (PUT) /Colony/:id
module.exports.updateColonyById = (data, callback) => {
    const SQL_STATEMENT = `
        UPDATE Colonies
        SET user_id = ?, planet_id = ?, colony_level = ?
        WHERE colony_id = ?
    `;
    const VALUES = [data.user_id, data.planet_id, data.colony_level, data.colony_id];

    pool.query(SQL_STATEMENT, VALUES, callback);
};

// DELETE BY ID (DELETE) /Colony/:id
module.exports.deleteColonyById = (data, callback) => {
    const SQL_STATEMENT = `
        DELETE FROM Colonies
        WHERE colony_id = ?
    `;
    const VALUES = [data.colony_id];

    pool.query(SQL_STATEMENT, VALUES, callback);
};
