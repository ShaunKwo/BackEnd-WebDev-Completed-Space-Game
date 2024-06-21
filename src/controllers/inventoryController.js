//Author: Shaun Kwo Rui Yu
//Adm No.: 2317933
// Class: DAAA/FT/1B06


const inventoryModel = require("../models/inventoryModel.js");

// READ ITEMS IN USER INVENTORY (GET) /inventory/:user_id
module.exports.getUserInventory = (req, res, next) => {
    const data = {
        user_id: req.params.user_id
    };

    const callback = (error, results, fields) => {
                res.status(200).json(results);
        
    };

    inventoryModel.getUserInventory(data, callback);
};
