//Author: Shaun Kwo Rui Yu
//Adm No.: 2317933
// Class: DAAA/FT/1B06



const model = require("../models/questsModel.js");

// ENDPOINT: CREATE Quest
module.exports.createNewQuest = (req, res, next) => {
    if (req.body.quest_name == undefined) {
        res.status(400).send("Error: quest_name is undefined");
        return;
    }

    const data = {
        quest_name: req.body.quest_name,
        item_id: req.body.item_id,
        planet_id: req.body.planet_id
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewQuest:", error);
            res.status(500).json(error);
        } else {
            res.status(201).json(results);
        }
    };

    model.createNewQuest(data, callback);
};

// ENDPOINT: READ ALL Quests
module.exports.readAllQuests = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error getQuests:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    };

    model.getAllQuests(callback);
};

// ENDPOINT: READ Quest BY ID
module.exports.readQuestById = (req, res, next) => {
    const data = {
        quest_id: req.params.id
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error getQuest:", error);
            res.status(500).json(error);
        } else {
            if (results.length === 0) {
                res.status(404).json({
                    error: "Quest not found"
                });
            } else {
                res.status(200).json(results[0]);
            }
        }
    };

    model.getQuestById(data, callback);
};

// ENDPOINT: UPDATE Quest BY ID
module.exports.updateQuestById = (req, res, next) => {
    const data = {
        quest_id: req.params.id,
        quest_name: req.body.quest_name,
        item_id: req.body.item_id,
        planet_id: req.body.planet_id
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateQuest:", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows === 0) {
                res.status(404).json({
                    error: "Quest not found"
                });
            } else {
                res.status(200).json(data);
            }
        }
    };

    model.updateQuestById(data, callback);
};

// ENDPOINT: DELETE Quest BY ID
module.exports.deleteQuestById = (req, res, next) => {
    const data = {
        quest_id: req.params.id
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteQuest:", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows === 0) {
                res.status(404).json({
                    error: "Quest not found"
                });
            } else {
                res.status(204).send();
            }
        }
    };

    model.deleteQuestById(data, callback);
};
