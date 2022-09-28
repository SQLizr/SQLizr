//const { Pool} = require('pg');
const db = require('../models/queryModel');
const bcrypt = require('bcrypt');

// const createErr = (errInfo) => {
//     const { method, type, err } = errInfo;
//     return {
//       log: `userController.${method} ${type}: ERROR: ${
//         typeof err === 'object' ? JSON.stringify(err) : err
//       }`,
//       message: {
//         err: `Error occurred userController.${method}. Check server logs for more details.`,
//       },
//     };
//   };

  const userController: any = {}

  userController.getAllUsers = (req:any, res:any, next:any) => {
    console.log('userController.getAllUsers')
    const queryText = `
    SELECT *
    FROM user_data
    ;`;

    db.query(queryText)
        .then((allUsers:any) => {
            res.locals.users = allUsers.rows;
            next()
        })
        // .catch((err:any) => {
        //     res.status(400);
        //     return next(
        //       createErr({
        //         method: 'getAllUsers',
        //         type: 'querying data',
        //         err,
        //       })
        //     );
        //   });
  }
  userController.checkUsernameAvailability = (req:any, res:any, next:any) => {
    console.log('in userController.checkUsernameAvailability');
    const { username } = req.body;
    console.log('check username:', username);

    const query = `
    SELECT * FROM user_data
    WHERE username = $1;`

    db.query(query, [username])
      .then((response:any) => {
        // logic if it already exists
        console.log('response:', response)
        if(response.rowCount !== 0) {
          console.log('response:', response.rowCount)
          return next({
            log: 'username already taken',
            status: 500,
            message: {
              err: 'Error in userController.checkUsernameAvailability - username already taken. Please try another one',
            },
          })
        }
        else{
          return next()
        }
     })
      .catch((err:any) => {
        return next({
          log: 'Express error in userController.checkUsernameAvailability',
          status: 500,
          message: {
            err: 'error in userController.checkUsernameAvailability - issue checking uniqueness of username',
          },
        });
      });
};


  userController.addUser = (req:any, res:any, next:any) => {
    console.log('in userController.addUser');
    const { username, password, organization} = req.body;
    console.log(username, password, organization);
    const user_id = Math.floor(Math.random()* 100000)

    //bcrypt logic to be worked on
    // const hashedPass = async () => {
    //   const hashPass = await bcrypt.hash(password, 12);
    //   return hashPass;
    // };
   
    // const user_id = async () => {
    //   const id = await bcrypt.hash(username, 12);
    //   return id;
    // };
    
    //console.log(hashedPass, user_id);

    const query = `
    INSERT INTO user_data (
      user_id, 
      username, 
      password, 
      organization 
      )
    VALUES (
      $1,
      $2,
      $3,
      $4
    );`

    db.query(query, [user_id, username, password, organization])
      .then((response:any) => {
        // insert logic for randomized, more secure ssid
        res.locals.username = username;
        console.log(`Account successfully created for: ${username}`)
        return next();
     })
      .catch((err:any) => {
        return next({
          log: 'Express error in userController.addUser',
          status: 500,
          message: {
            err: 'error in userController.addUser - issue with user creation',
          },
        });
      });
};


  userController.verifyUser = (req:any, res:any, next:any) => {
    console.log('userController.verifyUser')
    console.log('req.body is ', req.body);
    const { username, password } = req.body;
    console.log("username:", username, "password:", password);
    
    if (!username || !password) return next('Missing username or password in userController.verifyUser.');
    
    // const hashedPass = async () => {
    //   const hashPass = await bcrypt.hash(password, 12);
    //   return hashPass;
    // };
    // const user_id = bcrypt.hash(username, 12); 

    const query = `
    SELECT * 
    FROM user_data u
    WHERE u.username = $1 AND u.password = $2; `;

    db.query(query, [username, password])
      .then((user_data: any) => {
        if (!user_data) {
          console.log('no user in DB');
          res.redirect('/signup');
        } else {
            console.log(`successful logged in : ${username}!`);
            res.locals.user_data = user_data.rows;
            console.log('user data:', user_data.rows)
            return next();
        } 
      })
      .catch((err: any) => {
        return next(
          {
          log: 'Express error handler caught unknown error in userController.verifyUser',
          status: 500,
          message: {
            err: 'error in userController.verifyUser - login credentials incorrect',
          },
        }
        );
    });  
  }; 

module.exports = userController;