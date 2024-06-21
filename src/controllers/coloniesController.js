//Author: Shaun Kwo Rui Yu
//Adm No.: 2317933
// Class: DAAA/FT/1B06


const model = require("../models/coloniesModel.js");

// ENDPOINT: CREATE Colony
module.exports.createNewColony = (req, res, next) => {
    if (req.body.planet_id == undefined) {
        res.status(400).send("Error: colony_name or planet_id is undefined");
        return;
    }

    const data = {
        user_id: req.body.user_id,
        planet_id: req.body.planet_id,
        colony_level: req.body.colony_level || 0 // Default to 0 if colony_level is undefined
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewColony:", error);
            res.status(500).json(error);
        } else {
            res.status(201).json(results);
        }
    };

    model.createNewColony(data, callback);
};

// ENDPOINT: READ ALL Colonies
module.exports.readAllColonies = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error getColonies:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    };

    model.getAllColonies(callback);
};

// ENDPOINT: READ Colony BY ID
module.exports.readColonyById = (req, res, next) => {
    const data = {
        colony_id: req.params.id
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error getColony:", error);
            res.status(500).json(error);
        } else {
            if (results.length === 0) {
                res.status(404).json({
                    error: "Colony not found"
                });
            } else {
                res.status(200).json(results[0]);
            }
        }
    };

    model.getColonyById(data, callback);
};

// ENDPOINT: UPDATE Colony BY ID
module.exports.updateColonyById = (req, res, next) => {
    const data = {
        colony_id: req.params.id,
        user_id: req.body.user_id,
        planet_id: req.body.planet_id,
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateColony:", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows === 0) {
                res.status(404).json({
                    error: "Colony not found"
                });
            } else {
                res.status(200).json(data);
            }
        }
    };

    model.updateColonyById(data, callback);
};

// ENDPOINT: DELETE Colony BY ID
module.exports.deleteColonyById = (req, res, next) => {
    const data = {
        colony_id: req.params.id
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteColony:", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows === 0) {
                res.status(404).json({
                    error: "Colony not found"
                });
            } else {
                res.status(204).send();
            }
        }
    };

    model.deleteColonyById(data, callback);
};
