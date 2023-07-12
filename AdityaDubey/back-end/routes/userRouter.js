const userRouter = require("express").Router();
const user = require('../controller/user');

userRouter.post('/registration',user.registration);
userRouter.get('/login',user.login);
userRouter.get('/fetchData',user.getUser);

module.exports= userRouter;