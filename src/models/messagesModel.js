//Author: Shaun Kwo Rui Yu
//Adm No.: 2317933
// Class: DAAA/FT/1B06

const pool = require('../services/db');

// allows user to read all Messagess
module.exports.readAllMessages = (callback)=>{
    const SQLSTATEMENT =`
    SELECT Messages.*, Sender.username AS sender_username, reciever.username AS reciever_username
    FROM Messages
    LEFT JOIN User AS Sender ON Messages.user_id = Sender.user_id
    LEFT JOIN User AS reciever ON Messages.reciever_id = reciever.user_id;`;
    pool.query(SQLSTATEMENT,callback);
}


module.exports.createNewMessages = (data,callback)=>{
    const SQLSTATEMENT=`
    INSERT INTO Messages (user_id, content, reciever_id)
    VALUES(?,?,?);
    `
    const VALUES = [data.user_id,data.content,data.reciever_id];

    pool.query(SQLSTATEMENT, VALUES, callback); 
}

module.exports.updateMessagesById = (data, callback) =>
{
    const SQLSTATEMENT = `
    UPDATE Messages
    SET content = ?
    WHERE message_id = ?;
    `;
const VALUES = [data.content, data.message_id];

pool.query(SQLSTATEMENT, VALUES, callback);    
}

module.exports.deleteMessagesById = (data, callback) =>
{
    const SQLSTATEMENT = `
    DELETE FROM Messages 
    WHERE message_id = ?;
    `;
const VALUES = [data.message_id];

pool.query(SQLSTATEMENT, VALUES, callback);    
}

