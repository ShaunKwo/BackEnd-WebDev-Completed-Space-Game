//Author: Shaun Kwo Rui Yu
//Adm No.: 2317933
// Class: DAAA/FT/1B06

const model = require("../models/itemsModel.js");

// ENDPOINT: CREATE Item
module.exports.createNewItem = (req, res, next) => {
    if (req.body.item_name == undefined) {
        res.status(400).send("Error: item_name is undefined");
        return;
    }

    const data = {
        item_name: req.body.item_name,
        description: req.body.description
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewItem:", error);
            res.status(500).json(error);
        } else {
            res.status(201).json(results);
        }
    }

    model.createNewItem(data, callback);
}

// ENDPOINT: READ ALL Items
module.exports.readAllItems = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error getItems:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    }

    model.getAllItems(callback);
};

// ENDPOINT: READ Item BY ID
module.exports.readItemById = (req, res, next) => {
    const data = {
        item_id: req.params.id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error getItem:", error);
            res.status(500).json(error);
        } else {
            if (results.length === 0) {
                res.status(404).json({
                    error: "Item not found"
                });
            } else {
                res.status(200).json(results[0]);
            }
        }
    }

    model.getItemById(data, callback);
};

// ENDPOINT: UPDATE Item BY ID
module.exports.updateItemById = (req, res, next) => {
    const data = {
        item_id: req.params.id,
        item_name: req.body.item_name,
        description: req.body.description
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateItem:", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows === 0) {
                res.status(404).json({
                    error: "Item not found"
                });
            } else {
                res.status(200).json(data);
            }
        }
    }

    model.updateItemById(data, callback);
};

// ENDPOINT: DELETE Item BY ID
module.exports.deleteItemById = (req, res, next) => {
    const data = {
        item_id: req.params.id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteItem:", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows === 0) {
                res.status(404).json({
                    error: "Item not found"
                });
            } else {
                res.status(204).send();
            }
        }
    }

    model.deleteItemById(data, callback);
};
