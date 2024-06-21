//Author: Shaun Kwo Rui Yu
//Adm No.: 2317933
// Class: DAAA/FT/1B06


const pool = require('../services/db');

module.exports.createNewAppearance = (data, callback) => {
    const SQL_STATEMENT = `
        INSERT INTO Appearances (appearance_name, cost)
        VALUES (?, ?)
    `;
    const VALUES = [data.appearance_name, data.cost];

    pool.query(SQL_STATEMENT, VALUES, callback);
};

module.exports.getAllAppearances = (callback) => {
    const SQL_STATEMENT = `
        SELECT * FROM Appearances
    `;

    pool.query(SQL_STATEMENT, callback);
};

module.exports.getAppearanceById = (data, callback) => {
    const SQL_STATEMENT = `
        SELECT * FROM Appearances
        WHERE appearance_id = ?
    `;
    const VALUES = [data.appearance_id];

    pool.query(SQL_STATEMENT, VALUES, callback);
};

module.exports.updateAppearanceById = (data, callback) => {
    const SQL_STATEMENT = `
        UPDATE Appearances
        SET appearance_name = ?, cost = ?
        WHERE appearance_id = ?
    `;
    const VALUES = [data.appearance_name, data.cost, data.appearance_id];

    pool.query(SQL_STATEMENT, VALUES, callback);
};

module.exports.deleteAppearanceById = (data, callback) => {
    const SQL_STATEMENT = `
        DELETE FROM Appearances
        WHERE appearance_id = ?
    `;
    const VALUES = [data.appearance_id];

    pool.query(SQL_STATEMENT, VALUES, callback);
};
