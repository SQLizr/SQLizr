import express from 'express'
const queryController = require('../controllers/queryController');
const router = express.Router();

router.post('/', queryController.createQuery, (req:any, res:any) => {
    res.status(200).json(res.locals.query);
});

router.patch('/favorites/add', queryController.addFavorite, (req:any, res:any) => {
    res.status(200).json(res.locals.query);
});

router.patch('/favorites/remove', queryController.deleteFavorite, (req:any, res:any) => {
    res.status(200).json(res.locals.query);
});

router.patch('/', queryController.updateQuery, (req:any, res:any) => {
    res.status(200).json(res.locals.query);
});

router.delete('/', queryController.deleteQuery, (req:any, res:any) => {
    res.status(200).json(res.locals.query);
})

module.exports = router;