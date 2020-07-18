
module.exports = (req , res , next) =>
{
    const language = req.headers['x-language'];
    req.language = language ? language : 'en';
    next();
}