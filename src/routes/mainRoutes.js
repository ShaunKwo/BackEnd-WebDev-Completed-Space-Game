//Author: Shaun Kwo Rui Yu
//Adm No.: 2317933
// Class: DAAA/FT/1B06


const express = require('express');
const router = express.Router();

const taskRoutes = require('./taskRoutes');
const taskProgressRoutes = require('./taskProgressRoutes');
const userRoutes = require('./userRoutes');
const questsRoutes =require('./questsRoutes');
const questProgressRoutes= require('./questProgressRoutes');
const itemsRoutes= require('./itemsRoutes');
const inventoryRoutes=require('./inventoryRoutes');
const planetRoutes=require('./planetRoutes');
const coloniesRoutes=require('./coloniesRoutes');
const appearancesRoutes=require('./appearancesRoute')
const messagesRoute=require('./messagesRoute')

router.use("/tasks", taskRoutes);
router.use("/taskProgress", taskProgressRoutes);
router.use("/users", userRoutes);
router.use("/quests", questsRoutes);
router.use("/questProgress", questProgressRoutes);
router.use("/items", itemsRoutes);
router.use("/inventory", inventoryRoutes);
router.use("/planets", planetRoutes);
router.use("/colonies", coloniesRoutes);
router.use("/appearances", appearancesRoutes)
router.use("/messages", messagesRoute);


const jwtMiddleware = require('../middlewares/jwtMiddleware');
const bcryptMiddleware = require('../middlewares/bcryptMiddleware');
const userController = require('../controllers/userController');


router.post("/login", userController.login, bcryptMiddleware.comparePassword, jwtMiddleware.generateToken, jwtMiddleware.sendToken);
router.post("/register", userController.checkUsernameOrEmail, bcryptMiddleware.hashPassword, userController.register, jwtMiddleware.generateToken, jwtMiddleware.sendToken);
router.get("/jwt/verify", jwtMiddleware.verifyToken, jwtMiddleware.showVerifiedToken);

module.exports = router;