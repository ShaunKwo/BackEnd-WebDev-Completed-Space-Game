//Author: Shaun Kwo Rui Yu
//Adm No.: 2317933
// Class: DAAA/FT/1B06
const pool = require('../services/db');

// CREATE (POST) /Item
module.exports.createNewItem = (data, callback) => {
    const SQL_STATEMENT = `
        INSERT INTO Items (item_name, description)
        VALUES (?, ?)
    `;
    const VALUES = [data.item_name, data.description];

    pool.query(SQL_STATEMENT, VALUES, callback);
};



// READ ALL (GET) /Item
module.exports.getAllItems = (callback) => {
    const SQL_STATEMENT = `
        SELECT * FROM Items
    `;

    pool.query(SQL_STATEMENT, callback);
};



// READ BY ID (GET) /Item/:id
module.exports.getItemById = (data, callback) => {
    const SQL_STATEMENT = `
        SELECT * FROM Items
        WHERE item_id = ?
    `;
    const VALUES = [data.item_id];

    pool.query(SQL_STATEMENT, VALUES, callback);
};



// UPDATE BY ID (PUT) /Item/:id
module.exports.updateItemById = (data, callback) => {
    const SQL_STATEMENT = `
        UPDATE Items
        SET item_name = ?, description = ? WHERE item_id = ?
    `;
    const VALUES = [data.item_name, data.description,  data.item_id];

    pool.query(SQL_STATEMENT, VALUES, callback);
};



// DELETE BY ID (DELETE) /Item/:id
module.exports.deleteItemById = (data, callback) => {
    const SQL_STATEMENT = `
        DELETE FROM Items
        WHERE item_id = ?
    `;
    const VALUES = [data.item_id];

    pool.query(SQL_STATEMENT, VALUES, callback);
};
