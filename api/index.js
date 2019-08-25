class Api{
    constructor(app){
        const auth = require('./auth/auth-controller');
        const product = require('./product/product-controller');
        new auth(app);
        new product(app);
    }
}
module.exports = Api;