//Author: Shaun Kwo Rui Yu
//Adm No.: 2317933
// Class: DAAA/FT/1B06

// Import the abilityModel module
const model = require("../models/abilityModel.js");

// Endpoint to create a new ability
module.exports.createNewAbility = (req, res, next) => {
    
    if (req.body.ability_name == undefined || req.body.planet_id == undefined) {
        res.status(400).send("Error: ability_name or planet_id is undefined");
        return;
    }

    // Prepare data for creating a new ability
    const data = {
        ability_name: req.body.ability_name,
        planet_id: req.body.planet_id
    };

    
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewAbility:", error);
            res.status(500).json(error);
        } else {
            res.status(201).json(results);
        }
    };

    // Call the model function to create a new ability
    model.createNewAbility(data, callback);
};

// Endpoint to read all abilities
module.exports.readAllAbilities = (req, res, next) => {
const data ={ 
}    
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error getAbilities:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    };

    // Call the model function to get all abilities
    model.getAllAbilities(callback);
};

// Endpoint to read an ability by its ID
module.exports.readAbilityById = (req, res, next) => {

    const data = {
        ability_id: req.params.id
    };

    
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error getAbility:", error);
            res.status(500).json(error);
        } else {
            
            if (results.length === 0) {
                res.status(404).json({
                    error: "Ability not found"
                });
            } else {
                res.status(200).json(results[0]);
            }
        }
    };

    model.getAbilityById(data, callback);
};

// Endpoint to update an ability by its ID
module.exports.updateAbilityById = (req, res, next) => {
    
    const data = {
        ability_id: req.params.id,
        ability_name: req.body.ability_name,
        planet_id: req.body.planet_id
    };

    
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateAbility:", error);
            res.status(500).json(error);
        } else {
            
            if (results.affectedRows === 0) {
                res.status(404).json({
                    error: "Ability not found"
                });
            } else {
                res.status(200).json(data);
            }
        }
    };

    model.updateAbilityById(data, callback);
};

// Endpoint to delete an ability by its ID
module.exports.deleteAbilityById = (req, res, next) => {
    
    const data = {
        ability_id: req.params.id
    };

    
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteAbility:", error);
            res.status(500).json(error);
        } else {
            
            if (results.affectedRows === 0) {
                res.status(404).json({
                    error: "Ability not found"
                });
            } else {
                res.status(204).send();
            }
        }
    };

    model.deleteAbilityById(data, callback);
};
