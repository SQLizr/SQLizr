import express from 'express'
const queryController = require('../controllers/queryController');
const router = express.Router();

router.get('/', queryController.getAll, (req:any, res:any) => {
    res.status(200).json(res.locals.queries);
});

router.get('/tags', queryController.getAllTags, (req:any, res:any) => {
    res.status(200).json(res.locals.tags);
});

//Receive POST req from Front End, req.body should have authorization status & username (ex. 'admin', 'admin')
//we should return all of that user's favorited queries (array of objs)
router.post('/favorites', queryController.getUserFavorites, (req:any, res:any) => {
    res.status(200).json(res.locals.queries);
});

router.post('/history', queryController.getUserHistory, (req:any, res:any) => {
    res.status(200).json(res.locals.queries);
});

router.post('/', queryController.getSpecificQueries, (req:any, res:any) => {
    res.status(200).json(res.locals.queries);
});


module.exports = router;