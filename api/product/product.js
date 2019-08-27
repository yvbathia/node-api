const prodctModelContructor = require("./product-model");
const productModel = new prodctModelContructor().model;
const segmentModelContructor = require("../segment/segment-model");
const segmentModel = new segmentModelContructor().model;
const fs = require("fs");
const myId = mongoose.Types.ObjectId();

class Product {
  async getProducts(req, res) {
    try {
      let product = await productModel.aggregate([
        { "$addFields": { "productId": { "$toString": "$_id" }}},
        { $lookup:
           {
             from: 'segment',
             localField: 'productId',
             foreignField: 'product_id',
             as: 'segment'
           }
         }
        ]);
      res.send(product);
    } catch (error) {
      res.send({ Error: "Error getting products" });
    }
  }
  async getPublishedProducts(req, res) {
    try {
      let product = await productModel.aggregate([
        { "$addFields": { "productId": { "$toString": "$_id" }}},
        { $lookup:
           {
             from: 'segment',
             localField: 'productId',
             foreignField: 'product_id',
             as: 'segment'
           }
         },
         {
            $match:{
               "product.isPublished": true,
            }
         },
        ]);
      res.send(product);
    } catch (error) {
      res.send({ Error: "Error getting products" });
    }
  }

  async getProductById(req, res) {
    try {
      const product = await productModel.findById(req.params.id);
      if (!product) {
        throw new Error({ notFound: "product Not Found" });
      }
      const data = await productModel.find({ product_id: product.product_id });
      res.send(data);
    } catch (error) {
      res.send({ Error: "Error getting product" });
    }
  }

  async getSegmentById(req, res) {
    try {
      const segment = await productModel.findById(req.params.id);
      if (!segment) {
        throw new Error({ notFound: "segment Not Found" });
      }
      res.send(segment);
    } catch (error) {
      res.send({ Error: "Error getting segment" });
    }
  }

  async addProduct(req, res) {
    try {
      const segment = await segmentModel();
      const product = await productModel();
      product.name = req.body.name;
      product.isPublished = req.body.isPublished;
      product.isArchive = req.body.isArchive;
      const segmentResponse = await product.save();
      for (let i = 0; i < req.files.length; i++) {
        segment.images.push(req.files[i].originalname);
      }
      segment.product_id = segmentResponse.id,
      segment.video_url = req.body.video_url,
      segment.start_time = req.body.start_time,
      segment.end_time = req.body.end_time,
      segment.sequence_number = req.body.sequence_number,
      segment.isPublished = req.body.isPublished,
      segment.isArchive = req.body.isArchive,
      await segment.save();
      res.send({ Successful: "product Added Successfully" });
    } catch (e) {
      res.send({ Error: "Error Added product" });
    }
  }

  async updateProduct(req, res) {
    const productId = req.params.id;
    try {
      if (!productId) {
        throw new Error({ notFound: "productId Not Found" });
      }
      await productModel.update({ _id: productId }, { $set: req.body });
      res.send({ Successful: "Update Successfully" });
    } catch (e) {
      res.send({ Error: "Error getting product update" });
    }
  }

  async deleteProduct(req, res) {
    const productId = req.params.id;
    try {
      if (!productId) {
        res.send({ notFound: "productId Not Found" });
      }
      const product = await productModel.deleteOne({ _id: productId });
      res.send(product);
    } catch (e) {
      res.send({ Error: "Error getting product delete" });
    }
  }
}
module.exports = new Product();
