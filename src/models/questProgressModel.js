//Author: Shaun Kwo Rui Yu
//Adm No.: 2317933
// Class: DAAA/FT/1B06

const pool = require('../services/db');

module.exports.checkUserAppearance =(data, callback)=>{
    const SQL_STATEMENT = `
        SELECT appearance_id FROM user
        WHERE user_id = ?;
    `;
    const VALUES = [data.user_id];

    pool.query(SQL_STATEMENT, VALUES, callback);
}

// READ COMPLETED QUESTS BY USER (GET) 
module.exports.checkIfQuestCompletedBefore = (data, callback) => {
    const SQL_STATEMENT = `
        SELECT quest_id
        FROM questProgress
        WHERE user_id = ? AND quest_id = ?;
    `;
    const VALUES = [data.user_id, data.quest_id];

    pool.query(SQL_STATEMENT, VALUES, callback);
};

//MIDDLEWARE FOR POST TO SELECT item_id and planet_id
module.exports.getItemPlanetId= (data, callback)=>{
    const SQL_STATEMENT= `SELECT item_id, planet_id FROM Quests WHERE quest_id=? ;
                        SELECT COUNT(*) AS planet_count FROM Colonies WHERE user_id = ?;`;

    const VALUES= [data.quest_id, data.user_id];

pool.query(SQL_STATEMENT, VALUES, callback);
}


// CREATE (POST) /Quest
module.exports.createNewQuestProgress = (data, callback) => {
    const SQL_STATEMENT = `
        INSERT INTO QuestProgress (user_id, quest_id, quest_completion_date, quest_notes)
        VALUES (?, ?, ?, ?);
        INSERT INTO Inventory (user_id, item_id) VALUES (?,?);

        INSERT INTO Colonies (user_id, planet_id) VALUES(?,?);


        SELECT quest_progress_id, user_id, quests.quest_id, quest_completion_date, quest_notes, items.item_id, item_name,items.description, planets.planet_id,planet_name, planets.description
        FROM QuestProgress INNER JOIN Quests ON Quests.quest_id = QuestProgress.quest_id
        INNER JOIN items ON Quests.item_id = items.item_id
        INNER JOIN planets ON Quests.planet_id = Planets.planet_id 
        WHERE user_id=?
        ORDER BY quest_progress_id 
        DESC LIMIT 1
    `;
    const VALUES = [data.user_id, data.quest_id, data.quest_completion_date, data.quest_notes, data.user_id, data.item_id, data.user_id, data.planet_id, data.user_id];

    pool.query(SQL_STATEMENT, VALUES, callback);
};

// READ BY USER ID (GET) /QuestProgress/users/:user_id
module.exports.getQuestProgressByUserId = (data, callback) => {
    const SQL_STATEMENT = `
        SELECT QuestProgress.*, Quests.quest_name
        FROM QuestProgress
        INNER JOIN Quests ON QuestProgress.quest_id = Quests.quest_id
        WHERE QuestProgress.user_id=?
    `;
    const VALUES = [data.user_id];

    pool.query(SQL_STATEMENT, VALUES, callback);
};


// READ BY ID (GET) /Quest/:id
module.exports.getProgressById = (data, callback) => {
    const SQL_STATEMENT = `
        SELECT * FROM QuestProgress
        WHERE quest_progress_id=?
    `;
    const VALUES = [data.quest_progress_id];

    pool.query(SQL_STATEMENT, VALUES, callback);
};



// UPDATE BY ID (PUT) /Quest/:id
module.exports.updateProgressById = (data, callback) => {
    const SQL_STATEMENT = `
        UPDATE QuestProgress
        SET quest_notes = ? WHERE quest_progress_id = ?;
        
        SELECT * FROM QuestProgress
        WHERE quest_progress_id = ?;
        `;

    const VALUES = [data.quest_notes, data.id, data.id];

    pool.query(SQL_STATEMENT, VALUES, callback);
};



// DELETE BY ID (DELETE) /Quest/:id
module.exports.deleteProgressById = (data, callback) => {
    const SQL_STATEMENT = `
        DELETE FROM QuestProgress
        WHERE quest_progress_id = ?
    `;
    const VALUES = [data.quest_progress_id];

    pool.query(SQL_STATEMENT, VALUES, callback);
};


// READ USER ABILITIES, PLANETS, AND QUESTS (GET) 
module.exports.getUserPlanetsAbilities = (data, callback) => {
    const SQL_STATEMENT = `
        SELECT user_id, ability_name, planet_name
        FROM questProgress
        INNER JOIN quests ON questProgress.quest_id = quests.quest_id
        INNER JOIN Planets ON quests.planet_id = planets.planet_id
        INNER JOIN abilities ON planets.planet_id = abilities.planet_id
        WHERE user_id = ?
    `;
    const VALUES = [data.user_id];

    pool.query(SQL_STATEMENT, VALUES, callback);
};

