//const { Pool } = require('pg');
const queriesDB = require('../models/queryModel');

const queryController: any = {};

queryController.getAll = (req:any, res:any, next:any) => {
    console.log('queryController.getAll executed');

    const queryText = `SELECT * FROM queries;`;

    queriesDB.query(queryText)
        .then((allQueries:any) => {
            //console.log('getAll data: ', allQueries.rows);
            res.locals.queries = allQueries.rows;
            return next()
        })

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
              return next()
          })
    })

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
              return next()
          })
    })

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
      return next()
    })

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
      return next()
    })
}

queryController.createQuery = (req:any, res:any, next:any) => {
  const {query_data, http_type, tags, metric_name, authorization_status} = req.body
  const query_id = Math.floor(Math.random() * 100000)

  const queryText = `
  INSERT INTO queries (
    query_id,
    metric_name,
    http_type,
    tags,
    authorization_status,
    query_data
    )
    VALUES (
      $1,
      $2,
      $3,
      $4,
      $5,
      $6
    )
    RETURNING * 
  ;
  `;
  const values = [query_id, metric_name, http_type, tags, authorization_status, query_data]
  queriesDB.query(queryText, values)
      .then((all:any) => {
        console.log('createQuery: ', all.rows)
        res.locals.query = all.rows
        return next()
      })

}

queryController.updateQuery = (req:any, res:any, next:any) => {
  // destructure column label and new values off of req body
  // for each property to update, run SQL UPDATE query 
  const {query_id, query_data, http_type, tags, metric_name, authorization_status} = req.body
  const values = [query_id, query_data, http_type, tags, metric_name, authorization_status]
  
  const queryText = `
  UPDATE queries

  SET 
    query_id = $1,
    query_data = $2,
    http_type = $3, 
    tags = $4,
    metric_name = $5, 
    authorization_status = $6
  
  WHERE query_id = $1
  
  RETURNING *
  ;`;
  
  queriesDB.query(queryText, values)
    .then((updated:any) => {
      console.log('updatedQuery:', updated.rows)
      res.locals.query = updated.rows
      return next();
    })
  return next();
}

queryController.deleteQuery = (req:any, res:any, next:any) => {
  const {query_id} = req.body;
  const queryText = `
  DELETE FROM queries
  WHERE query_id = $1
  RETURNING *
  ;`;
  const values = [query_id];
  queriesDB.query(queryText, values)
    .then((deleted:any) => {
      console.log('deleteQuery:', deleted.rows)
      res.locals.query = deleted.rows
      return next();
    })

}

queryController.addFavorite = (req: any, res: any, next:any) => {
  const {query_id, username, favorites} = req.body
  const updatedFavorites = [...favorites, query_id]
  const values = [username, updatedFavorites]

  const queryText = `
  UPDATE user_data
  SET favorites = $2
  WHERE username = $1
  
  RETURNING *
  ;`

  queriesDB.query(queryText, values)
  .then((updated:any)=>{
    console.log(updated.rows)
    res.locals.query = updated.rows
    next();
  })
}

queryController.deleteFavorite = (req: any, res: any, next:any) =>{

  const {query_id, username, favorites} = req.body 
  const updatedFavorites  = favorites.filter((fav: any)=>{ return fav !== query_id})
  
  const values = [username, updatedFavorites]

  const queryText = `
  UPDATE user_data
  SET favorites = $2
  WHERE username = $1
  
  RETURNING *
  ;`

  queriesDB.query(queryText, values)
  .then((updated:any)=>{
    console.log(updated.rows)
    res.locals.query = updated.rows
    next();
  })
}

module.exports = queryController;