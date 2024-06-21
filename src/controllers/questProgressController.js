//Author: Shaun Kwo Rui Yu
//Adm No.: 2317933
// Class: DAAA/FT/1B06


const model = require("../models/questProgressModel.js");
// MIDDLEWARE: CHECK IF USER APPEARANCE
module.exports.checkUserAppearance = (req, res, next) => {
    const data = {
        user_id: req.params.user_id
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error checking user appearance:", error);
            res.status(500).json({ message: "Internal server error" });
        } else {
            if (results[0].appearance_id==1) {
                res.status(403).json({ message: "User is not Captain, Engineer or Scientist" });
            } else {
                next();
            }
        }
    };
    model.checkUserAppearance(data, callback);
}

// MIDDLEWARE: CHECK IF QUEST IS COMPLETED BEFORE
module.exports.checkIfQuestCompletedBefore = (req, res, next) => {
    const data = {
        quest_id: req.params.quest_id,
        user_id: req.params.user_id
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error checking quest completion:", error);
            res.status(500).json({ message: "Internal server error" });
        } else {
            if (results.length > 0) {
                res.status(403).json({ message: "User has already completed this quest" });
            } else {
                next();
            }
        }
    };

    model.checkIfQuestCompletedBefore(data, callback);
};

// MIDDLEWARE: GET ITEM AND PLANET ID
module.exports.getItemPlanetId = (req, res, next) => {
    const data = { quest_id: req.params.quest_id, user_id: req.params.user_id };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error getItemPlanetId:", error);
            res.status(500).json(error);
        } else if (results) {
            res.locals.itemid = results[0][0].item_id;
            res.locals.planetid = results[0][0].planet_id;
            res.locals.colony_level = results[1][0].planet_count;
            res.locals.power_level = results[1][0].planet_count;
            next();
        }
    };

    model.getItemPlanetId(data, callback);
};

// ENDPOINT: CREATE QUEST PROGRESS
module.exports.createQuestProgress = (req, res, next) => {
    const optionalquest_Notes = req.body.quest_notes || null;
    const data = {
        user_id: req.params.user_id,
        quest_id: req.params.quest_id,
        quest_completion_date: req.body.quest_completion_date,
        quest_notes: optionalquest_Notes,
        item_id: res.locals.itemid,
        planet_id: res.locals.planetid,
        planet_count: res.locals.colony_level
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createQuestProgress:", error);
            res.status(500).json(error);
        } else if (results) {
            res.status(201).json(results[3]);
        }
    };

    model.createNewQuestProgress(data, callback);
};


// ENDPOINT: READ QuestProgress by user_id
module.exports.getQuestProgressByUserId = (req, res, next) => {
    const data = {
        user_id: req.params.user_id
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error getQuestProgressByUserId:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    };

    model.getQuestProgressByUserId(data, callback);
};


// ENDPOINT: READ QUEST PROGRESS BY ID
module.exports.readQuestProgressById = (req, res, next) => {
    const data = {
        quest_progress_id: req.params.id
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error getQuestProgress:", error);
            res.status(500).json(error);
        } else {
            if (results.length === 0) {
                res.status(404).json({
                    error: "Progress not found"
                });
            } else {
                res.status(200).json(results[0]);
            }
        }
    };

    model.getProgressById(data, callback);
};

// ENDPOINT: UPDATE QUEST PROGRESS BY ID
module.exports.updateQuestProgressById = (req, res, next) => {
    const data = {
        quest_notes: req.body.quest_notes,
        id: req.params.id
    };

    const callback = (error, results, fields) => {
        console.log(results);
        if (error) {
            console.error("Error updatequestProgress:", error);
            res.status(500).json(error);
        } else if (results[0].affectedRows == 0) {
            res.status(404).json({
                error: "Progress not found"
            });
        } else {
            res.status(200).json(results[1][0]);
        }
    };

    model.updateProgressById(data, callback);
};

// ENDPOINT: DELETE QUEST PROGRESS BY ID
module.exports.deleteQuestProgressById = (req, res, next) => {
    const data = {
        quest_progress_id: req.params.id
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deletequestProgress:", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows === 0) {
                res.status(404).json({
                    error: "Progress not found"
                });
            } else {
                res.status(204).send();
            }
        }
    };

    model.deleteProgressById(data, callback);
};

// ENDPOINT: READ USER ABILITIES, PLANETS, AND QUESTS
module.exports.getUserPlanetsAbilities = (req, res, next) => {
    const data = {
        user_id: req.params.user_id
    };

    const callback = (error, results, fields) => {
                res.status(200).json(results);
            
    };

    model.getUserPlanetsAbilities(data, callback);
};
