//Author: Shaun Kwo Rui Yu
//Adm No.: 2317933
// Class: DAAA/FT/1B06

const pool = require('../services/db');

module.exports.createNewAbility = (data, callback) => {
    const SQL_STATEMENT = `
        INSERT INTO Abilities (ability_name, planet_id)
        VALUES (?, ?)
    `;
    const VALUES = [data.ability_name, data.planet_id];

    pool.query(SQL_STATEMENT, VALUES, callback);
};

module.exports.getAllAbilities = (callback) => {
    const SQL_STATEMENT = `
        SELECT * FROM Abilities
    `;

    pool.query(SQL_STATEMENT, callback);
};

module.exports.getAbilityById = (data, callback) => {
    const SQL_STATEMENT = `
        SELECT * FROM Abilities
        WHERE ability_id = ?
    `;
    const VALUES = [data.ability_id];

    pool.query(SQL_STATEMENT, VALUES, callback);
};

module.exports.updateAbilityById = (data, callback) => {
    const SQL_STATEMENT = `
        UPDATE Abilities
        SET ability_name = ?, planet_id = ?
        WHERE ability_id = ?
    `;
    const VALUES = [data.ability_name, data.planet_id, data.ability_id];

    pool.query(SQL_STATEMENT, VALUES, callback);
};

module.exports.deleteAbilityById = (data, callback) => {
    const SQL_STATEMENT = `
        DELETE FROM Abilities
        WHERE ability_id = ?
    `;
    const VALUES = [data.ability_id];

    pool.query(SQL_STATEMENT, VALUES, callback);
};

