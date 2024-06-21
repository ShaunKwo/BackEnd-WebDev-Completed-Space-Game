//Author: Shaun Kwo Rui Yu
//Adm No.: 2317933
// Class: DAAA/FT/1B06

const model = require("../models/userModel.js");

module.exports.readAllUsers = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllUsers:", error);
            res.status(500).json(error);
        }
        else res.status(200).json(results);
    }

    model.getAllUsers(callback);
}

module.exports.readUserById = (req, res, next) => {
    const data = {
        id: req.params.id
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readUserById:", error);
            res.status(500).json(error);
        } else {
            if (results[0].length == 0) {
                res.status(404).json({
                    message: "User not found"
                });
            }
            else{ 
                results[0][0]['colony_level'] = results[2][0]['planet_count'];
                results[0][0]['power_level']  =results[2][0]['planet_count']

                if (results[1][0]['points'] == null)
                    results[1][0]['points'] = 0;
                
                results[0][0]['total_points'] = results[1][0]['points'];
                res.status(200).send(results[0][0]);
             }  
        }
    }

    model.getUserById(data, callback);
}

module.exports.createNewUser = (req, res, next) => {
    if (req.body.username == undefined || req.body.email == undefined) {
        res.status(400).send("Error: Username or email is undefined");
        return;
    }

    const data = req.body;

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewUser:", error);
            res.status(500).json(error);
        } else {
            res.status(201).json({
                user_id: results.insertId,
                username: req.body.username,
                email: req.body.email
            });
        }
    }

    model.createNewUser(data, callback);
}

module.exports.updateUserById = (req, res, next) => {
    if (req.body.username == undefined || req.body.email == undefined) {
        res.status(400).json({
            message: "Error: Username or email is undefined"
        });
        return;
    }

    const data = {
        user_id: req.params.id,
        username: req.body.username,
        email: req.body.email
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateUserById:", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows == 0) {
                res.status(404).json({
                    message: "User not found"
                });
            }
            else res.status(200).json({
                user_id: req.params.id,
                username: req.body.username,
                email: req.body.email
            }); 
        }
    }

    model.updateUserById(data, callback);
}

module.exports.deleteUserById = (req, res, next) => {
    const data = {
        user_id: req.params.id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteUserById:", error);
            res.status(500).json(error);
        } else {
            if (results[0].affectedRows == 0) {
                res.status(404).json({
                    message: "The requested user_id does not exist"
                });
            }
            else res.status(204).send(); // 204 No Content            
        }
    }

    model.deleteUserById(data, callback);
}

module.exports.checkEmail = (req, res, next) => {
    if (req.body.email == undefined) {
        res.status(400).send("Error: Email is undefined");
        return;
    }

    const data = { email: req.body.email }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewUser:", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows == 0) {
                res.status(400).json({ message: "User not found" })
            }
            else if (results.length > 0) {
                res.status(409).json({ message: "The provided email is already associated with another user" })
            }
            else next()
        }
    }

    model.checkEmail(data, callback);
}

module.exports.checkUsernameOrEmail = (req, res, next) => {
    if (req.body.username == undefined || req.body.email == undefined) {
        res.status(400).send("Error: Username or email is undefined");
        return;
    }

    const data = { username: req.body.username, email: req.body.email }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewUser:", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows == 0) {
                res.status(400).json({ message: "User not found" })
            }
            else if (results.length > 0) {
                res.status(409).json({ message: "The provided username or email is already associated with another user" })
            }
            else next()
        }
    }

    model.checkUserNameOrEmail(data, callback);
}

// /:user_id/buy-appearance/:appearance_id

module.exports.checkPoints =(req, res, next)=> {

    const data= {user_id: req.params.user_id, appearance_id: req.params.appearance_id} //total point and purchase cost

    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json({ message: "Internal server error", error });
        } else {
                var userpoints =results[0][0]['points']
                var purchaseCost=results[1][0]['cost']

                if (userpoints==null){ results[0][0]['points']=0 };
                if (purchaseCost==null){ results[1][0]['cost']=0 };
                console.log(results)

                if (userpoints<purchaseCost){
                res.status(404).json({message: " total_points < purchase cost, purchase cost is "+ userpoints })}
                
                else
                    next()
                }
    }

    model.checkPts(data, callback);
}




module.exports.buyAppearance = (req, res, next) => {

    const data = { task_id: req.params.appearance_id+4, appearance_id: req.params.appearance_id, user_id: req.params.user_id };

    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json({ message: "Internal server error", error });
        } else {
            res.status(200).json(results)
        }
    };

    model.buyAppearance(data, callback);
};

//////////////////////////////////////////////////////
// CONTROLLER FOR LOGIN
//////////////////////////////////////////////////////
module.exports.login = (req, res, next) => {
  if (req.body.username == undefined || req.body.password == undefined) {
    res.status(400).json({
      message: "Error: username or password is undefined",
    });
    return;
  }

  const data = {
    username: req.body.username
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error login:", error);
      res.status(500).json(error);
    } else {
      if (results.length == 0) {
        res.status(404).json({
          message: "User not found",
        });
      } else {
        res.locals.user_id = results[0].user_id;
        res.locals.username = results[0].username;
        res.locals.hash = results[0].password;
        res.locals.message = "User " + res.locals.username + " logged in successfully.";
        next();
      }
    }
  };

  model.selectUserByUsername(data, callback);
};

//////////////////////////////////////////////////////
// CONTROLLER FOR REGISTER
//////////////////////////////////////////////////////
module.exports.register = (req, res, next) => {
  if (
    req.body.username == undefined ||
    req.body.email == undefined ||
    req.body.password == undefined
  ) {
    res.status(400).send("Error: username is undefined");
    return;
  }

  const data = {
    username: req.body.username,
    email: req.body.email,
    password: res.locals.hash,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error register:", error);
      res.status(500).json(error);
    } else {
      res.locals.userId = results.insertId;
      res.locals.username = req.body.username;
      res.locals.message = "User " + req.body.username + " created successfully.";
      next();
    }
  };

  model.insertUser(data, callback);
};
