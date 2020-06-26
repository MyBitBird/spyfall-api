const express = require('express');
const app = express();

require('./routes')(app);
require('./db/db')();

const PORT = process.env.PORT || 5500;
app.listen(PORT , () =>{
    console.log(`${PORT} connected...`)
})