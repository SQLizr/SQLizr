const { Pool:any } = require('pg');
const queriesDB = require('../models/queryModel');

const createErr = (errInfo:any) => {
    const { method, type, err } = errInfo;
    return {
      log: `queryController.${method} ${type}: ERROR: ${
        typeof err === 'object' ? JSON.stringify(err) : err
      }`,
      message: {
        err: `Error occurred queryController.${method}. Check server logs for more details.`,
      },
    };
  };

const queryController: any = {};

queryController.getAll = (req:any, res:any, next:any) => {
    console.log('queryController.getAll executed');

    const queryText = `SELECT * FROM queries;`;

    queriesDB.query(queryText)
        .then((data:any) => {
            console.log('getAll data: ', data.rows);
            res.locals.queries = data.rows;
            next()
        })
        .catch((err:any) => {
            res.status(400);
            return next(
              createErr({
                method: 'getAll',
                type: 'querying data',
                err,
              })
            );
          });
}

queryController.getUserFavorites = (req:any, res:any, next:any) => {
  console.log('queryController.getUserFavorites executed');

  const queryText = `
  SELECT Q.* , U.username, U.user_id, U.authorization_status
  FROM queries Q
  LEFT JOIN user_data U
  ON Q.query_id = ANY(U.favorites)
  ;
  `;

  queriesDB.query(queryText)
      .then((data:any) => {
          console.log('getUserFavorites data: ', data.rows);
          res.locals.queries = data.rows;
          next()
      })
      .catch((err:any) => {
          res.status(400);
          return next(
            createErr({
              method: 'getUserFavorites',
              type: 'querying data',
              err,
            })
          );
        });
}

module.exports = queryController;