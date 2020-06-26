const express = require('express');
const app = express();
require('./routes')(app);

app.get('/api/' , (req , res) => {
    res.status(200).send('hello spy fall');
});


const PORT = process.env.PORT || 5500;
app.listen(PORT , () =>{
    console.log(`${PORT} connected...`)
})