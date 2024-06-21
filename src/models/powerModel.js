//Author: Shaun Kwo Rui Yu
//Adm No.: 2317933
// Class: DAAA/FT/1B06

const pool = require('../services/db');

module.exports.createNewPower = (data, callback) => {
    const SQL_STATEMENT = `
        INSERT INTO Powers (power_name, description, colony_level)
        VALUES (?, ?, ?)
    `;
    const VALUES = [data.power_name, data.description, data.colony_level];

    pool.query(SQL_STATEMENT, VALUES, callback);
};

module.exports.getAllPowers = (callback) => {
    const SQL_STATEMENT = `
        SELECT * FROM Powers
    `;

    pool.query(SQL_STATEMENT, callback);
};

module.exports.getPowerById = (data, callback) => {
    const SQL_STATEMENT = `
        SELECT * FROM Powers
        WHERE power_id = ?
    `;
    const VALUES = [data.power_id];

    pool.query(SQL_STATEMENT, VALUES, callback);
};

module.exports.updatePowerById = (data, callback) => {
    const SQL_STATEMENT = `
        UPDATE Powers
        SET power_name = ?, description = ?, colony_level = ?
        WHERE power_id = ?
    `;
    const VALUES = [data.power_name, data.description, data.colony_level, data.power_id];

    pool.query(SQL_STATEMENT, VALUES, callback);
};

module.exports.deletePowerById = (data, callback) => {
    const SQL_STATEMENT = `
        DELETE FROM Powers
        WHERE power_id = ?
    `;
    const VALUES = [data.power_id];

    pool.query(SQL_STATEMENT, VALUES, callback);
};
