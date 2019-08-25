const jwt = require('jsonwebtoken');
class Token {
    static tokenCheck(req, res, next) {
        try {
            console.log(req.headers.token,"headers");
            const decoded = jwt.verify(req.body.token, 'pragnesh');
            req.decoded = decoded;
            next();
        } catch (e) {
            res.status(401).send("auth failed");
        }
    }
}
module.exports =  Token;
