const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;
module.exports = (obj) => {
    console.log('obj: ', obj);
    return jwt.sign(obj, jwtSecret, {
        expiresIn: '1day',
    });
};