const { Pool } = require('pg');

const PG_URI = 'postgres://miyvkbtk:80FMWrjnj3zbpuCJ508ICVi2ghjYui5C@heffalump.db.elephantsql.com/miyvkbtk'

//create a new pool with the above connection string
const pool = new Pool({
    connectionString: PG_URI,
});

module.exports = {
    query: (text:any, params:any, callback:any) => {
        return pool.query(text, params, callback);
    }
}