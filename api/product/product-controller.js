const product = require('./product');

class ProductController{
    constructor(router){
        router.get('/api/v1/products',product.getProducts);
        router.put('/api/v1/product/:id',product.updateProduct);
        router.post('/api/v1/product/add',global.upload.any(),product.addProduct);
    }
}
module.exports = ProductController;