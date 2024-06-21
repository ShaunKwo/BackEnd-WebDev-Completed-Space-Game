//Author: Shaun Kwo Rui Yu
//Adm No.: 2317933
// Class: DAAA/FT/1B06

const model = require("../models/appearancesModel.js");

// ENDPOINT: CREATE Appearance
module.exports.createAppearance = (req, res, next) => {
    const data = {
        appearance_name: req.body.appearance_name,
        cost: req.body.cost
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createAppearance:", error);
            res.status(500).json(error);
        } else if (results) {
            res.status(201).json({
                appearance_id: results.insertId,
                appearance_name: req.body.appearance_name,
                cost: req.body.cost
            });
        }
    };

    model.createNewAppearance(data, callback);
};

// ENDPOINT: READ All Appearances
module.exports.readAllAppearances = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error getAllAppearances:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    };

    model.getAllAppearances(callback);
};

// ENDPOINT: READ Appearance by ID
module.exports.readAppearanceById = (req, res, next) => {
    const data = {
        appearance_id: req.params.id
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error getAppearanceById:", error);
            res.status(500).json(error);
        } else {
            if (results.length === 0) {
                res.status(404).json({
                    error: "Appearance not found"
                });
            } else {
                res.status(200).json(results[0]);
            }
        }
    };

    model.getAppearanceById(data, callback);
};

// ENDPOINT: UPDATE Appearance by ID
module.exports.updateAppearanceById = (req, res, next) => {
    const data = {
        appearance_name: req.body.appearance_name,
        cost: req.body.cost,
        appearance_id: req.params.id
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateAppearanceById:", error);
            res.status(500).json(error);
        } else if (results[0].affectedRows == 0) {
            res.status(404).json({
                error: "Appearance not found"
            });
        } else {
            res.status(200).json({
                appearance_id: req.params.id,
                appearance_name: req.body.appearance_name,
                cost: req.body.cost
            });
        }
    };

    model.updateAppearanceById(data, callback);
};

// ENDPOINT: DELETE Appearance by ID
module.exports.deleteAppearanceById = (req, res, next) => {
    const data = {
        appearance_id: req.params.id
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteAppearanceById:", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows === 0) {
                res.status(404).json({
                    error: "Appearance not found"
                });
            } else {
                res.status(204).send();
            }
        }
    };

    model.deleteAppearanceById(data, callback);
};
