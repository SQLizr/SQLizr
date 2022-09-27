//server/server.ts
const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
const searchRouter = require('./routers/searchRouter.ts')
const loginRouter = require('./routers/loginRouter.ts')

//PARSE BODY ON EVERY REQUEST
app.use(express.json());

console.log('server.js process.env.NODE_ENV: ', process.env.NODE_ENV)
if(process.env.NODE_ENV === 'production'){
    // if NODE_ENV is production, serve the files in /build
    // app.use('/build', express.static(path.join(__dirname, '../build')));
}

//ROUTES
// serve static files in 'public' folder
app.use(express.static(path.join(__dirname, './src/public')))

app.use('/search', searchRouter)
app.use('/login', loginRouter)

//GLOBAL ERROR HANDLER
// catch-all route handler
app.use((req:any, res:any) => res.status(404).send('404: Page not found'));

app.use((err:any, req:any, res:any, next:any) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

//listens on port 3000 
app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}...`);
  });

module.exports = app;

