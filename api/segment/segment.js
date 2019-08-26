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

  async updateSegment(req, res) {}
}
module.exports = new Segment();
