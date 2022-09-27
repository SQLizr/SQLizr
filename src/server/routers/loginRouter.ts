import express from 'express'
const userController = require('../controllers/userController');
const router = express.Router();

router.get('/allUsers', userController.getAllUsers, (req:any, res:any) => {
    res.status(200).json(res.locals.users);
});

router.post('/verify', userController.verifyUser, (req:any, res:any) => {
  res.status(200).json(res.locals.user_data);
});

router.post('/sign-up', userController.addUser, (req:any, res:any) => {
  res.status(200).json(res.locals.username);
});

module.exports = router;