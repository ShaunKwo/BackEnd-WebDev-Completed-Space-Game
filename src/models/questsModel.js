//Author: Shaun Kwo Rui Yu
//Adm No.: 2317933
// Class: DAAA/FT/1B06

const pool = require('../services/db');

// CREATE (POST) /Quests
module.exports.createNewQuest = (data, callback) => {
    const SQL_STATEMENT = `
        INSERT INTO Quests (quest_name, item_id, planet_id)
        VALUES (?, ?, ?)
    `;

    const VALUES = [data.quest_name, data.item_id, data.planet_id];

    pool.query(SQL_STATEMENT, VALUES, callback);
};

// READ ALL (GET) /Quests
module.exports.getAllQuests = (callback) => {
    const SQL_STATEMENT = `
        SELECT * FROM Quests
    `;

    pool.query(SQL_STATEMENT, callback);
};

// READ BY ID (GET) /Quests/:id
module.exports.getQuestById = (data, callback) => {
    const SQL_STATEMENT = `
        SELECT * FROM Quests 
        WHERE quest_id = ?
    `;
    const VALUES = [data.quest_id];

    pool.query(SQL_STATEMENT, VALUES, callback);
};

// UPDATE BY ID (PUT) /Quests/:id
module.exports.updateQuestById = (data, callback) => {
    const SQL_STATEMENT = `
        UPDATE Quests
        SET quest_name = ?, item_id = ?  
        WHERE quest_id = ?
    `;
    const VALUES = [data.quest_name, data.item_id, data.quest_id];

    pool.query(SQL_STATEMENT, VALUES, callback);
};

// DELETE BY ID (DELETE) /Quests/:id
module.exports.deleteQuestById = (data, callback) => {
    const SQL_STATEMENT = `
        DELETE FROM Quests
        WHERE quest_id = ?
    `;
    const VALUES = [data.quest_id];

    pool.query(SQL_STATEMENT, VALUES, callback);
};