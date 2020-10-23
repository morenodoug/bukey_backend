const jwt = require('jsonwebtoken');
const config = require("../config")

module.exports = function(req, res, next) {
    const token = req.body.token ;
    if (token) {
        jwt.verify(token, config.jwtSecret, (err, decoded) => {
            if (err) {
                console.error(err);
                return res.status(401).json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                req.decoded = decoded;
                next();
            }
        }); 
    } else {
        res.status(403).json({
            success: false,
            message: 'No token provided.'
        });
    }

}