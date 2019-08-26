const segmentModelContructor = require("./segment-model");
const segmentModel = new segmentModelContructor().model;
const fs = require("fs");

class Segment {
  async getSegmentsByProductId(req, res) {
    try {
      const data = await segmentModel.find({});
      res.send(data);
    } catch (error) {
      res.send({ Error: "Error getting product" });
    }
  }
  async getSegmentById(req, res) {
    try {
      const segment = await segmentModel.findById(req.params.id);
      if (!segment) {
        throw new Error({ notFound: "product Not Found" });
      }
      res.send(segment);
    } catch (error) {
      res.send({ Error: "Error getting product" });
    }
  }

  async updateSegment(req, res) {
    const segmentId = req.params.id;
    try {
      if (!segmentId) {
        throw new Error({ notFound: "productId Not Found" });
      }
      await segmentModel.updateOne({ _id: segmentId }, { $set: req.body });
      res.send({ Successful: "Update Successfully" });
    } catch (e) {
      res.send({ Error: "Error getting product update" });
    }
  }
  async updateSegmentsSequence(req, res) {
    const data = req.body.payload;
    try {
      for (let i = 0; i < data.length; i++){
        await segmentModel.updateOne({ _id: data[i].segment_id }, { $set: {sequence_number: data[i].sequence_number} });
      }
      res.send({ Successful: "Update Successfully" });
    } catch (e) {
      res.send({ Error: "Error getting product update" });
    }
  }
}
module.exports = new Segment();
