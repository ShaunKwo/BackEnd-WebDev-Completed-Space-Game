//Author: Shaun Kwo Rui Yu
//Adm No.: 2317933
// Class: DAAA/FT/1B06


const model = require("../models/planetModel.js");

// ENDPOINT: CREATE Planet
module.exports.createNewPlanet = (req, res, next) => {
    if (req.body.planet_name == undefined) {
        res.status(400).send("Error: planet_name is undefined");
        return;
    }

    const data = {
        planet_name: req.body.planet_name,
        description: req.body.description
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewPlanet:", error);
            res.status(500).json(error);
        } else {
            res.status(201).json(results);
        }
    }

    model.createNewPlanet(data, callback);
}

// ENDPOINT: READ ALL Planets
module.exports.readAllPlanets = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error getPlanets:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    }

    model.getAllPlanets(callback);
};

// ENDPOINT: READ Planet BY ID
module.exports.readPlanetById = (req, res, next) => {
    const data = {
        planet_id: req.params.id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error getPlanet:", error);
            res.status(500).json(error);
        } else {
            if (results.length === 0) {
                res.status(404).json({
                    error: "Planet not found"
                });
            } else {
                res.status(200).json(results[0]);
            }
        }
    }

    model.getPlanetById(data, callback);
};

// ENDPOINT: UPDATE Planet BY ID
module.exports.updatePlanetById = (req, res, next) => {
    const data = {
        planet_id: req.params.id,
        planet_name: req.body.planet_name,
        description: req.body.description
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updatePlanet:", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows === 0) {
                res.status(404).json({
                    error: "Planet not found"
                });
            } else {
                res.status(200).json(data);
            }
        }
    }

    model.updatePlanetById(data, callback);
};

// ENDPOINT: DELETE Planet BY ID
module.exports.deletePlanetById = (req, res, next) => {
    const data = {
        planet_id: req.params.id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deletePlanet:", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows === 0) {
                res.status(404).json({
                    error: "Planet not found"
                });
            } else {
                res.status(204).send();
            }
        }
    }

    model.deletePlanetById(data, callback);
};
