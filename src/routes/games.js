const express = require('express');
const router = express.Router();
const auth = require('../midleware/auth')

router.post('/' ,auth, (req , res)=>{

})

router.get('/' , auth , (req , res) =>{
    res.status(200).send('games');
    
})

module.exports = router;