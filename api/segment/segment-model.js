class SegmentModel {
  constructor() {
    try {
      this.model = global.mongoose.model("segment");
    } catch (e) {
      const SegmentSchema = new global.mongoose.Schema(
        {
          name: {
            type: String
          },
          product_id: {
            type: String
          },
          video_url: {
            type: String
          },
          start_time: {
            type: String
          },
          end_time: {
            type: String
          },
          images: {
            type: Array
          },
          sequence_number: {
            type: Number
          }
        },
        {
          collection: "segment",
          versionKey: false
        }
      );
      this.model = global.mongoose.model("segment", SegmentSchema);
    }
  }
}
module.exports = SegmentModel;
