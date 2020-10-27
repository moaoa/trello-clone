const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;
module.exports = (req, res, next) => {
    let token = req.header('authorization');
    if (!token)
        return res.status(401).json({ msg: 'No Token autorization denied' });
    token = token.replace('Bearer ', '');

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded;
        next()
    } catch (error) {
        res.status(400).json({ msg: 'Token is Not valid' });
        console.log(error);
    }
};