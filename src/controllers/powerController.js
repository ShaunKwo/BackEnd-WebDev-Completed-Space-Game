//Author: Shaun Kwo Rui Yu
//Adm No.: 2317933
// Class: DAAA/FT/1B06

const model = require("../models/powerModel.js");

// ENDPOINT: CREATE Power
module.exports.createNewPower = (req, res, next) => {
    if ( req.body.colony_level == undefined) {
        res.status(400).send("Error: colony_level is undefined");
        return;
    }

    const data = {
        colony_level: req.body.colony_level
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewPower:", error);
            res.status(500).json(error);
        } else {
            res.status(201).json(results);
        }
    };

    model.createNewPower(data, callback);
};

// ENDPOINT: READ ALL Powers
module.exports.readAllPowers = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error getPowers:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    };

    model.getAllPowers(callback);
};

// ENDPOINT: READ Power BY ID
module.exports.readPowerById = (req, res, next) => {
    const data = {
        power_id: req.params.id
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error getPower:", error);
            res.status(500).json(error);
        } else {
            if (results.length === 0) {
                res.status(404).json({
                    error: "Power not found"
                });
            } else {
                res.status(200).json(results[0]);
            }
        }
    };

    model.getPowerById(data, callback);
};

// ENDPOINT: UPDATE Power BY ID
module.exports.updatePowerById = (req, res, next) => {
    const data = {
        power_id: req.params.id,
        colony_level: req.body.colony_level
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updatePower:", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows === 0) {
                res.status(404).json({
                    error: "Power not found"
                });
            } else {
                res.status(200).json(data);
            }
        }
    };

    model.updatePowerById(data, callback);
};

// ENDPOINT: DELETE Power BY ID
module.exports.deletePowerById = (req, res, next) => {
    const data = {
        power_id: req.params.id
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deletePower:", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows === 0) {
                res.status(404).json({
                    error: "Power not found"
                });
            } else {
                res.status(204).send();
            }
        }
    };

    model.deletePowerById(data, callback);
};
