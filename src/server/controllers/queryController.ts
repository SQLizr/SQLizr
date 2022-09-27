//const { Pool } = require('pg');
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
        .then((allQueries:any) => {
            //console.log('getAll data: ', allQueries.rows);
            res.locals.queries = allQueries.rows;
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

  const {username} = req.body;
  //const username = 'admin_user'
  const queryText1 = `
  SELECT U.favorites
  FROM user_data U
  WHERE U.username = $1
  ;
  `;
  queriesDB.query(queryText1, [username])
    .then((user:any) => {
      const values = user.rows[0].favorites
      //console.log('getUserFavorites values: ',values)
      const queryText2 = `
      SELECT *
      FROM queries 
      WHERE queries.query_id = ANY($1)
      ;
      `;
      queriesDB.query(queryText2, [values])
          .then((favorites:any) => {
              //console.log('getUserFavorites data: ', favorites.rows);
              res.locals.queries = favorites.rows;
              next()
          })
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

queryController.getUserHistory = (req:any, res:any, next:any) => {
  console.log('queryController.getUserHistory executed');

  const {username} = req.body;
  //const username = 'admin_user'
  const queryText1 = `
  SELECT U.search_history
  FROM user_data U
  WHERE U.username = $1
  ;
  `;
  queriesDB.query(queryText1, [username])
    .then((user:any) => {
      const values = user.rows[0].search_history
      //console.log('getUserHistory values: ',values)
      const queryText2 = `
      SELECT *
      FROM queries 
      WHERE queries.query_id = ANY($1)
      ;
      `;
      queriesDB.query(queryText2, [values])
          .then((history:any) => {
              //console.log('getUserHistory data: ', history.rows);
              res.locals.queries = history.rows;
              next()
          })
    })
    .catch((err:any) => {
        res.status(400);
        return next(
          createErr({
            method: 'getUserHistory',
            type: 'querying data',
            err,
          })
        );
      });
}

queryController.getSpecificQueries = (req:any, res:any, next:any) => {
  console.log('queryController.getSpecificQueries executed');

  //const {username} = req.body;
  //const metric_name = 'All sales'
  // const http_type = 'GET'
  const{http_type}  = req.body;
  const queryText = `
  SELECT * 
  FROM queries Q
  WHERE Q.http_type = $1
  ;

  `;
  queriesDB.query(queryText, [http_type])
    .then((queries:any) => {
      //console.log('getSpecificQueries: ', queries.rows)
      res.locals.queries = queries.rows
      next()
    })
    .catch((err:any) => {
        res.status(400);
        return next(
          createErr({
            method: 'getSpecificQueries',
            type: 'querying data',
            err,
          })
        );
      });
}

queryController.getAllTags = (req:any, res:any, next:any) => {
  
  const queryText = `
  SELECT ARRAY_AGG(c)
  FROM (
    SELECT unnest(queries.tags)
    FROM queries
    )
  AS dt(c)
  ;
  `;

  queriesDB.query(queryText)
    .then((tags:any) => {
      //console.log('getAllTags tags.rows[0]: ', tags.rows[0].array_agg)
      const tagsRow = tags.rows[0].array_agg
      const filtered:any = {}
      for(let i = 0; i < tagsRow.length; i++){
        if(!filtered[tagsRow[i]]){
          filtered[tagsRow[i]] = true
        }
      }
      //console.log('filtered: ', filtered)
      const filteredTags: string[] = []
      for(let [key, value] of Object.entries(filtered)){
        filteredTags.push(key)
      }
      //console.log('filteredTags: ',filteredTags)
      res.locals.tags = filteredTags
      next()
    })
}

queryController.updateQuery = (req:any, res:any, next:any) => {
  next()
}

queryController.deleteQuery = (req:any, res:any, next:any) => {
  next() 
}


module.exports = queryController;