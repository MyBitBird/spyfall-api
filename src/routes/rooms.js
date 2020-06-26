const express = require('express');

const route = express.Router();

const get = route.get('/' , (req , res) =>{
    res.status(200).send('Rooms');

});

module.exports = route;