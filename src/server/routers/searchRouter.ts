//server/routers/db.js
import express from 'express'
const queryController = require('../controllers/queryController');
const router = express.Router();

router.get('/', queryController.getAll, (req:any, res:any) => {
    res.status(200).json(res.locals.queries);
});

// router.post('/', logController.addLog, (req:any, res:any) => {
//     res.status(200);
// });

// router.patch('/:id', logController.updateLog, (req:any, res:any) => {
//     res.status(200);
// });

// router.delete('/:id', logController.deleteLog, (req:any, res:any) => {
//     res.status(200).json(res.locals.logs);
// })

module.exports = router;