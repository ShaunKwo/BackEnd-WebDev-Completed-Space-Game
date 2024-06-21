//Author: Shaun Kwo Rui Yu
//Adm No.: 2317933
// Class: DAAA/FT/1B06



const model = require("../models/messagesModel.js");

module.exports.readAllMessages= (req,res,next) =>
{
    const callback=(error,results,fields)=>{
        if(error){
            console.error("Error readAllMessages:", error)
            res.status(500).json(error);
        }
        else res.status(200).json(results);
    }
    model.readAllMessages(callback);
}

module.exports.createNewMessages = (req, res, next) =>
{
    if(req.params.user_id == undefined || req.body.content==undefined||req.body.reciever_id==undefined)
    {
        res.status(400).json({
            message: "Missing required data."
        });
        return;
    }

    const data = {
        user_id : req.params.user_id,
        content:req.body.content,
        reciever_id:req.body.reciever_id,
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error addMessage:", error);
            res.status(500).json({
                message:"Internal server error.",
                error
            });
        } else {console.log(data.user_id)
            res.status(201).json({
                message: "Message added successfully.",
                user_id:data.user_id,
                content:req.body.content,
                reciever_id:req.body.reciever_id,
        });
        }
    }

    model.createNewMessages(data, callback);
}

module.exports.updateMessagesById = (req, res, next) =>
{
    if(req.body.content == undefined)
    {
        res.status(400).json({
            message: "Missing required data."
        });
        return;
    }

    const data = {
        message_id : req.params.message_id,
        content : req.body.content
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateMessagesById:", error);
            res.status(500).json(error);
        } else {
            if(results.affectedRows == 0) 
            {
                res.status(404).json({
                    message: "Message not found"
                });
            }
            else {
               
                res.status(200).json({
                    message_id:data.message_id,
                    content:data.content
                });
            }; 
        };
    };
    model.updateMessagesById(data, callback);
};    


module.exports.deleteMessagesById = (req, res, next) =>
{
    const data = {
        message_id: req.params.message_id,
    }


    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteMessageById:", error);
            console.error("Error deleteMessageById:", error);
            res.status(500).json(error);
        } else {
            if(results.affectedRows == 0) 
            {
                res.status(404).json({
                    message: "Message not found."
                });
            }
            else res.status(204).json({
                message: "Message deleted."
            });            
        };
    };
    model.deleteMessagesById(data, callback);
};