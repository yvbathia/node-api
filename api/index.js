class Api{
    constructor(app){
        const auth = require('./auth/auth-controller');
        const product = require('./product/product-controller');
        const segment = require('./segment/segment-controller');
        new auth(app);
        new product(app);
        new segment(app);
    }
}
module.exports = Api;