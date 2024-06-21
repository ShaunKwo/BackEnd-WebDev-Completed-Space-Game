//Author: Shaun Kwo Rui Yu
//Adm No.: 2317933
// Class: DAAA/FT/1B06

const pool = require('../services/db');

// CREATE (POST) /Planet
module.exports.createNewPlanet = (data, callback) => {
    const SQL_STATEMENT = `
        INSERT INTO Planets (planet_name, description )
        VALUES (?, ?)
    `;
    const VALUES = [data.planet_name, data.description];

    pool.query(SQL_STATEMENT, VALUES, callback);
};



// READ ALL (GET) /Planet
module.exports.getAllPlanets = (callback) => {
    const SQL_STATEMENT = `
        SELECT * FROM Planets
    `;

    pool.query(SQL_STATEMENT, callback);
};



// READ BY ID (GET) /Planet/:id
module.exports.getPlanetById = (data, callback) => {
    const SQL_STATEMENT = `
        SELECT * FROM Planets
        WHERE planet_id = ?
    `;
    const VALUES = [data.planet_id];

    pool.query(SQL_STATEMENT, VALUES, callback);
};



// UPDATE BY ID (PUT) /Planet/:id
module.exports.updatePlanetById = (data, callback) => {
    const SQL_STATEMENT = `
        UPDATE Planets
        SET planet_name = ?, description = ? WHERE planet_id = ?
    `;
    const VALUES = [data.planet_name, data.description, data.planet_id];

    pool.query(SQL_STATEMENT, VALUES, callback);
};



// DELETE BY ID (DELETE) /Planet/:id
module.exports.deletePlanetById = (data, callback) => {
    const SQL_STATEMENT = `
        DELETE FROM Planets
        WHERE planet_id = ?
    `;
    const VALUES = [data.planet_id];

    pool.query(SQL_STATEMENT, VALUES, callback);
};
