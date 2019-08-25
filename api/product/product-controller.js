const product = require('./product');

class ProductController{
    constructor(router){
        router.get('/api/v1/products',product.getProducts);
        router.get('/api/v1/product/:id',product.getProductById);
        router.get('/api/v1/segment/:id',product.getSegmentById);
        router.post('/api/v1/product/add',global.upload.any(),product.addProduct);
        router.put('/api/v1/product/updateSegment/:id',product.updateProduct);
        router.delete('/api/v1/editproduct/:id',product.deleteProduct)
    }
}
module.exports = ProductController;