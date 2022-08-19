const express = require('express');
const itemsRoutes = require('./routes/items'); 
const ExpressError = require('./expressError'); 

const app = express(); 

app.use(express.json()); 
app.use('/items', itemsRoutes); 



// 404 Handler
app.use(function(req, res) {
  return new ExpressError('Not Found', 404); 
})

// generic error handler 
app.use((err, req, res, next) => {
  let status = err.status || 500; 

  return res.status(status).json({
    error: {
      message: err.message,
      status: status
    }
  })
});


module.exports = app; 