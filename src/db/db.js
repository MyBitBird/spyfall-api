const mongoos = require('mongoose');
const config = require('config');

module.exports = async () =>
{
    try{
        const db = await mongoos.connect(config.db, {useNewUrlParser: true , useUnifiedTopology: true});
        console.log('connected to db successfully')
    }
    catch(e){
        console.log('connection to db failed....' , e);
    }
}

