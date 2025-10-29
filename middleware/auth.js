const jwt = require('jsonwebtoken');
const config = require('config');


module.exports = function(req, res, next) {
    const token = req.header("x-auth-token");

    if(!token) {
        return res.status(400).json("access denied due to no token");
    }

    try {
        const decoded = jwt.verify(token, config.jwtToken);
        req.user = decoded.user
        next() //Pass control to the next middleware/route
    } catch(err) {
        return res.status(400).json({error: err});
    }
};