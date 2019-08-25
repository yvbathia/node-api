const auth = require('./auth');
class AuthController{
    constructor(router){
        router.post('/api/v1/login', auth.login);
        router.post('/api/v1/signup', auth.signup);
    }
}
module.exports = AuthController